import * as React from "react";
import {divSetPoints, divPointDefault, divPointBlue} from "../../styles/Styles"

export class InputImageSet extends React.Component<{
    isNormalizationMode: boolean, setPoints: number[][], inputSetPoints: number[][]}, {}> {

    render() {
        const _divSetPoints = divSetPoints as React.CSSProperties;
        const _divPoint = divPointDefault as React.CSSProperties;
        const _divPointBlue = divPointBlue as React.CSSProperties;

        const setPoints: number[][] = this.props.isNormalizationMode ? 
            this.props.setPoints : this.props.inputSetPoints;

        const newValues = (point: number[]) => point.map((item: number, index) =>
            <p key={index}>
                {((item ^ 0) === item) ? item : item.toFixed(2)}
            </p>
        );

        const newSetPoints = setPoints.map((item: number[], index) => {
            if (index % 2 === 0) 
                return <div style={_divPoint} key={index}>
                            <h4>X{index + 1}</h4>{newValues(item)}
                    </div>
            else 
                return <div style={_divPointBlue} key={index}>
                            <h4>X{index + 1}</h4>{newValues(item)}
                    </div>
        });

        return <div>
                    <h3>Входное множество образов</h3>
                    <div style={_divSetPoints}>{newSetPoints}</div>
                    <hr />
                </div>
    }
}