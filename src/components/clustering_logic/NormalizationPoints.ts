export class NormalizationPoints {

    neuronWeights: number[][]; //Начальные веса нейронов
    setPoints: number[][]; //Множество образов

    //Рассчитать Евклидово расстояние
    public getEuclideanDistance(x1: number, x2: number, x3: number, y1: number, y2: number, y3: number): number {

        return Math.pow((x1 - y1), 2) + Math.pow((x2 - y2), 2) + Math.pow((x3 - y3), 2);
    }

    //Нормализация входных образов
    public getNormalizationPoint(point: number[]): number[] {
        let length: number = 0;
        let newPoint: number[] = []

        point.forEach(coordinate => { length += Math.pow(coordinate, 2) });
        length = Math.sqrt(length);

        point.forEach((coordinate, i) => { newPoint.push(coordinate / length) });

        return newPoint;
    }

    // Нормализация образов множества
    public normalizationPoint(countClusters: number) {
        this.neuronWeights = [];
        let startWeight = -1;
        const indexSetPoints: number[] = [];

        for (let i = 0; i < countClusters; i++) {

            if (startWeight === -1)
                startWeight = Math.floor(Math.random() * (this.setPoints.length - 1));
            else
                startWeight = this.getNewNeuronWeight(indexSetPoints);

            indexSetPoints.push(startWeight);

            this.neuronWeights.push(this.setPoints[startWeight]);
        }
    }

    //Получение новых первоначальных весов нейронов 
    private getNewNeuronWeight(indexSetPoints: number[]): number {
        const distanceEuclidean: number[] = [];
        let summDistace: number = 0;

        this.setPoints.forEach((point: number[], i) => {
            if (!indexSetPoints.includes(i))
                indexSetPoints.forEach(j => {

                    summDistace += this.getEuclideanDistance(this.setPoints[j][0], this.setPoints[j][1], this.setPoints[i][2],
                        point[0], point[1], point[2]);
                });

            distanceEuclidean.push(summDistace);
            summDistace = 0;
        });

        return distanceEuclidean.indexOf(Math.max.apply(null, distanceEuclidean))
    }
}