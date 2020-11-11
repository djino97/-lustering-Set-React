import * as React from "react";
import {InputValueButton} from "./InputValueButton"
import {numericButton, buttonInputClustersLeft, buttonInputSpeedLeft} from "../../styles/Styles"

export class ClusteringParametrs extends React.Component<{
    valueCluster: number, valueSpeed: number, 
    setClusters: (valueInt: number) => void, setSpeedTraining: (valueFloat: number) => void}, {}> {

    render() {
        return <div>
                    <div>
                        <p style={numericButton as React.CSSProperties}>
                            <h4>Количество кластеров</h4>
                            <InputValueButton 
                                setValue={this.props.valueCluster}
                                divisionValue={1}
                                eventHandler={this.props.setClusters}
                                styleButton={buttonInputClustersLeft as React.CSSProperties}/>
                        </p>
                    </div>
                    <div>
                        <p style={numericButton as React.CSSProperties}>
                            <h4>Скорость обучения нейронов</h4>
                            <InputValueButton 
                                setValue={this.props.valueSpeed}
                                divisionValue={0.1}
                                eventHandler={this.props.setSpeedTraining}
                                styleButton={buttonInputSpeedLeft as React.CSSProperties}/>
                        </p>
                    </div>
                </div>
    }
}