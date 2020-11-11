import {NormalizationPoints} from "./NormalizationPoints";

export class KohonenLayer {

    normalizationPoints: NormalizationPoints; //нормализованные входные образы
    neuronWeights: number[][];                //веса нейронов
    startNeuronWeights: number[][];           //начальные  веса нейронов
    setPoints: number[][];                    //входные значения образов 
    clusterСenters: number[][];               //центры кластеров
    countTraining = 0;                        //число циклов обучения неронов
    countClusters = 0;                        //количество кластеров на выходе
    speedTraining = 0;                        //заданное значение скорости обучения нейронов

    // основной метод для кластеризации множества образов
    public clusteringSetPoints(setPoints: number[][]): Map<number, number[]>{
        this.countTraining = 0;

        this.normalizationPoints = new NormalizationPoints();

        setPoints.forEach((point: number[], i: number)=> {
            setPoints[i] = this.normalizationPoints.getNormalizationPoint(point);
        });

        this.normalizationPoints.setPoints = setPoints.slice();

        this.normalizationPoints.normalizationPoint(this.countClusters);

        this.normalizationPoints.getNormalizationPoint
            
        this.neuronWeights = this.normalizationPoints.neuronWeights;
        this.startNeuronWeights = this.neuronWeights;
        this.setPoints = setPoints;

        let clusters = new Map<number,number[]>();
        clusters.set(0,[0]);

        let arrPoints = (point: number, idexNeuron: number):number[] => {
            let arr_ = clusters.get(idexNeuron);
            arr_.push(point);

            return arr_;
        };

        clusters = this.clusteringInputSet(clusters, setPoints, arrPoints);

        clusters = this.getSortedCluster(clusters);
        this.findCenterClusters(clusters);

        return clusters;
    }

    // Основной цикл для кластеризации входного множества
    private clusteringInputSet(clusters: Map<number,number[]>, setPoints: number[][], 
        arrPoints: (point: number, idexNeuron: number) => number[]) :  Map<number,number[]> {
        let idexMinDistanceNeuron = 0;

        let distanceBetweenPoints: number[] = [];
        let tmpPreviousCluster: number[] = [1];

        while(!this.checkEqualsClusters(clusters.get(idexMinDistanceNeuron), tmpPreviousCluster)) {

            tmpPreviousCluster = clusters.get(idexMinDistanceNeuron).slice();
            clusters.clear();

            setPoints.forEach((point: number[], i: number) => {
                this.neuronWeights.forEach((weight: number[]) => {
                    distanceBetweenPoints.push(this.normalizationPoints.getEuclideanDistance(weight[0], weight[1],
                        weight[2], point[0], point[1], point[2]));
                })

                idexMinDistanceNeuron = distanceBetweenPoints.indexOf(Math.min.apply(null, distanceBetweenPoints));

                if(clusters.has(idexMinDistanceNeuron))
                    clusters.set(idexMinDistanceNeuron, arrPoints(i, idexMinDistanceNeuron));
                else
                    clusters.set(idexMinDistanceNeuron, [i]);

                this.neuronWeights = this.getNewNeuronWeight(this.neuronWeights, point, idexMinDistanceNeuron);

                distanceBetweenPoints = [];
            })

            this.countTraining++;
        }

        return clusters;
    }


    private checkEqualsClusters(newCluster: number[], tmpPreviousCluster: number[]): boolean {
        for(let i = 0; i< newCluster.length; i++){
            
            if(newCluster[i] !== tmpPreviousCluster[i])
                return false;
        };

        return true;
    }


    // Перерасчет весов каждого нейрона  
    private getNewNeuronWeight(neuronWeights: number[][], point: number[], idexMinDistanceNeuron: number): number[][] {
        let distanceBetweenNeuronWeights: number = 0;
        let tmpNeuronWeights: number[][] = [];

        neuronWeights.forEach((weight: number[], i: number) => {
            distanceBetweenNeuronWeights = this.normalizationPoints.getEuclideanDistance(neuronWeights[idexMinDistanceNeuron][0], 
                neuronWeights[idexMinDistanceNeuron][1], neuronWeights[idexMinDistanceNeuron][2], weight[0], weight[1], weight[2]);

            if (distanceBetweenNeuronWeights === 0)
                tmpNeuronWeights.push(this.getCorrectionOfNeuronWeight(weight, point));
            else 
                tmpNeuronWeights.push(weight);
        });

        return tmpNeuronWeights;
    }

    //Расчет по формуле новых значений весов каждого нейрона 
    private getCorrectionOfNeuronWeight(_neuronWeight: number[], point: number[]): number[] {
        const newNeuronWeight: number[] = [];

        _neuronWeight.forEach((weight, i) => {
            newNeuronWeight.push(weight + this.speedTraining * (point[i] - weight));
        });

        return newNeuronWeight;
    }

    //Расчет центра для каждого класстера
    private findCenterClusters(clusters: Map<number, number[]>) {
        const clusterСenters: number[][] = [];
        let meanSumm: number[];

        const getMeanCoordinate = (index: number, cluster: number) => 
        meanSumm[index]/clusters.get(cluster).length

        for(let cluster of clusters.keys()){
            meanSumm = [0, 0, 0];

            clusters.get(cluster).forEach((indexPoint: number) => {
                this.setPoints[indexPoint].forEach((point: number, index) => {
                    meanSumm[index] += point
                }) 
            });

            clusterСenters.push([getMeanCoordinate(0, cluster), getMeanCoordinate(1, cluster),
                getMeanCoordinate(2, cluster)
            ]);

        }

        this.clusterСenters = clusterСenters;
    }

    private getSortedCluster(clusters: Map<number, number[]>) {
        let tmpClusters = new Map<number, number[]>();
        let tmpArr: number[] = [];

        for(let cluster of clusters.keys()){
            tmpArr.push(cluster);
        };

        tmpArr.sort();

        tmpArr.forEach((index: number) => {
            tmpClusters.set(index, clusters.get(index));
        });

        return tmpClusters;
    }
}