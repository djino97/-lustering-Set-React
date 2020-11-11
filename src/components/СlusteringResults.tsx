import * as React from "react";
import {OutputClusters} from "./OutputClusters";
import { KohonenLayer } from "./clustering_logic/KohonenLayer";
import {InitialNeuronWeights} from "./InitialNeuronWeights";
import {
    resultWeightCluster, resultWeights_, resultClustering_, newText
} from "../styles/Styles"

export class СlusteringResults extends React.Component<{
    clusteringSetsPoint: Map<number, number[]>, kohonenLayer: KohonenLayer}, {}> {

    render() {
        return <div>
                    <h3 style={newText as React.CSSProperties}>Результат кластеризации входного множества</h3>
                    <div style={resultWeightCluster}>
                        <div style={resultClustering_ as React.CSSProperties}>
                        <OutputClusters clusteringSetsPoint={this.props.clusteringSetsPoint} />
                        <h4 style={newText as React.CSSProperties}>
                            Число циклов обучения: {this.props.kohonenLayer.countTraining + 1}
                        </h4>
                        </div>
                        <div style={resultWeights_ as React.CSSProperties}>
                            <InitialNeuronWeights 
                                startNeuronWeights= {this.props.kohonenLayer.startNeuronWeights}
                                neuronWeights={this.props.kohonenLayer.neuronWeights}
                                clusterСenters={this.props.kohonenLayer.clusterСenters}/>
                        </div>
                    </div>
                </div>
    }
}