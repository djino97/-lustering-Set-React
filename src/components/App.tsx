import * as React from "react";
import {СlusteringResults} from "./СlusteringResults";
import {KohonenLayer} from "./clustering_logic/KohonenLayer";
import {InputImageSet} from "./input_value_dashboard/InputImageSet";
import {ClusteringDashboard} from "./input_value_dashboard/ClusteringDashboard";

export class App extends React.Component<{}, {
    value: string, inputSetPoints: number[][], hideInputSet: boolean, resultClustering: boolean,
    clusteringSetsPoint: Map<number, number[]>, isNormalizationMode: boolean, valueCluster: number, valueSpeed: number}> {

    kohonenLayer: KohonenLayer = new KohonenLayer();

    constructor(props: any) {
        super(props);

        this.setClusters = this.setClusters.bind(this);
        this.setSpeedTraining = this.setSpeedTraining.bind(this);
        this.clusteringSets = this.clusteringSets.bind(this);
        this.checkMode = this.checkMode.bind(this);

        this.state = {
            value: '',
            inputSetPoints: [],
            hideInputSet: false,
            resultClustering: false,
            isNormalizationMode: false,
            clusteringSetsPoint: new Map([[0, []]]),
            valueCluster: 0,
            valueSpeed: 0
        };
    }

    checkMode() {
        let isNormalize = this.state.isNormalizationMode ? false : true

        this.setState({isNormalizationMode: isNormalize} )
    }

    inputPointConversion(e: any) {
        const inputSet: string[] = e.target.value.split(' ');
        const outPointSet: number[][] = [];

        inputSet.forEach((point: string, i: number) => {
            let arrPoint: number[] = [];

            point.split(/[(|)|,]/g).filter(item => item !== "").forEach((value: string) => {
                arrPoint.push(Number(value));
            })
            outPointSet.push(arrPoint);
        });

        this.setState({ value: e.target.value, inputSetPoints: outPointSet, hideInputSet: true });
    }

    clusteringSets() {
        const inputSet = this.state.inputSetPoints.slice();

        this.kohonenLayer.countClusters = this.state.valueCluster;
        this.kohonenLayer.speedTraining = this.state.valueSpeed;

        this.setState({
            clusteringSetsPoint: this.kohonenLayer.clusteringSetPoints(inputSet),
            resultClustering: true
        });
    }

    setClusters(val: number) {
        this.setState({ valueCluster: Number((this.state.valueCluster + val).toFixed(1)) });
    }

    setSpeedTraining(val: number) {
        this.setState({ valueSpeed: Number((this.state.valueSpeed + val).toFixed(1)) });
    }

    render() {
        return <div>
                    {
                        this.state.hideInputSet ?
                        <ClusteringDashboard 
                            inputSetPoints={this.state.inputSetPoints}
                            valueCluster={this.state.valueCluster}
                            valueSpeed={this.state.valueSpeed}
                            setClusters={this.setClusters}
                            setSpeedTraining={this.setSpeedTraining}
                            clusteringSets={this.clusteringSets}
                            checkMode={this.checkMode}/>
                        :
                        <div>
                            <h3>Введите входное множество образов</h3>
                            <input type="text" onChange={(event: any) => this.inputPointConversion(event)} />
                        </div>
                    }
                    <hr/>
                    {
                        this.state.hideInputSet &&
                        <InputImageSet
                            isNormalizationMode={this.state.isNormalizationMode}
                            setPoints={this.kohonenLayer.setPoints}
                            inputSetPoints={this.state.inputSetPoints}/>
                    }
                    {
                        this.state.resultClustering &&
                        <СlusteringResults 
                            clusteringSetsPoint={this.state.clusteringSetsPoint}
                            kohonenLayer={this.kohonenLayer}/>
                    }
        </div>
    }
}