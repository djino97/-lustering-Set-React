import * as React from "react";
import {
    resultClustering,resultWeight_, divWeightsBlue, divWeights, divCenter, divCenterBlue
} from "../styles/Styles"

export class InitialNeuronWeights extends React.Component<{
    startNeuronWeights: number[][], neuronWeights: number[][], clusterСenters: number[][]}, {}> {

    render() {
        const divWeightsBlue_ = divWeightsBlue as React.CSSProperties;
        const divWeights_ = divWeights as React.CSSProperties;

        const newValues = (point: number[]) => point.map((item: number, index) =>
        <p key={index}>{((item ^ 0) === item) ? item : item.toFixed(2)}</p>
        );

        const neuronWeights = (weights: number[][]) => weights.map((weight: number[], index) => {
            if (index % 2 === 0) 
                return <div style={divWeights_} key={index}>
                            <h4>W{index + 1}</h4>{newValues(weight)}
                        </div>
            else 
                return <div style={divWeightsBlue_} key={index}>
                            <h4>W{index + 1}</h4>{newValues(weight)}
                        </div>
        });

        const neuronCenter = (center: number[][]) => center.map((center: number[], index) => {
            if (index % 2 === 0) 
                return <div style={divCenter as React.CSSProperties} key={index}>
                            <h4>CTR{index + 1}</h4>
                            {newValues(center)}
                        </div>
            else 
                return <div style={divCenterBlue as React.CSSProperties} key={index}>
                            <h4>CTR{index + 1}</h4>
                            {newValues(center)}
                        </div>
        });

        return <React.Fragment>
                    <div style={resultWeight_ as React.CSSProperties}>
                        <p>Начальные веса нейронов</p>
                        <div style={resultClustering as React.CSSProperties}>
                            {neuronWeights(this.props.startNeuronWeights)}
                        </div>
                    </div>

                    <div style={resultWeight_ as React.CSSProperties}>
                        <p>Рассчитанные веса нейронов</p>
                        <div style={resultClustering as React.CSSProperties}>
                            {neuronWeights(this.props.neuronWeights)}
                        </div>
                    </div>

                    <div style={resultWeight_ as React.CSSProperties}>
                        <p>Рассчитанные центры кластеров</p>
                        <div style={resultClustering as React.CSSProperties}>
                            {neuronCenter(this.props.clusterСenters)}
                        </div>
                    </div>
                </React.Fragment>
    }
}