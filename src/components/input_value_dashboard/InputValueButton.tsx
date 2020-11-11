import * as React from "react";
import {
    buttonInputClustersRight, inputValues
} from "../../styles/Styles"

export class InputValueButton extends React.Component<{
    setValue: number, divisionValue: number, styleButton: React.CSSProperties,
    eventHandler: (divisionValue: number) => void}, {}> {

    render() {
        return <React.Fragment>
                    <button style={this.props.styleButton}
                        type="button" onClick={() => this.props.eventHandler(-this.props.divisionValue)}>-</button>
                    <input style={inputValues as React.CSSProperties}
                        type="number" min="0" max="100" value={this.props.setValue} />
                    <button style={buttonInputClustersRight as React.CSSProperties}
                        type="button" onClick={() => this.props.eventHandler(this.props.divisionValue)}>+</button>
        </React.Fragment>
    }
}