import * as React from "react";
import {ClusteringParametrs} from "./ClusteringParametrs";
import { 
    buttonClustering, buttonNormalization, 
    inputInitialValues, buttonsCalculate
} from "../../styles/Styles"

export class ClusteringDashboard extends React.Component<{ 
    inputSetPoints:number[][], valueCluster: number, valueSpeed: number, 
    setClusters: (valueInt: number) => void, setSpeedTraining: (valueFloat: number) => void, 
    clusteringSets: () =>  void, checkMode: () => void }, {}> {

    render() {
        return <div style={inputInitialValues as React.CSSProperties}>
                    <div style={buttonsCalculate as React.CSSProperties}>
                        <p>
                            <button style={buttonClustering as React.CSSProperties}
                                onClick={() => this.props.clusteringSets()}>Рассчитать</button>
                        </p>
                        <p>
                            <button style={buttonNormalization as React.CSSProperties}
                                onClick={() => this.props.checkMode()}>Нормализовать</button>
                        </p>
                    </div>
                    <ClusteringParametrs
                        valueCluster={this.props.valueCluster}
                        valueSpeed={this.props.valueSpeed}
                        setClusters={this.props.setClusters}
                        setSpeedTraining={this.props.setSpeedTraining}/>
                </div>
    }
}