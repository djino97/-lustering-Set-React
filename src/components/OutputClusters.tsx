import * as React from "react";
import {
     resultClustering, resultClustersBlue, resultClusters
} from "../styles/Styles"

export class OutputClusters extends React.Component<{ clusteringSetsPoint: Map<number, number[]> }> {
    render() {

        const valuesPoint = (point: number[]) => point.map((item: number, index: number) =>
            <p key={index}>{item + 1}</p>
        );

        let count = 0;

        const newClusters = (cluster: number) => {
            if (count % 2 === 0) {
                return <div style={resultClustersBlue as React.CSSProperties} key={count++}>
                    <h4>C{count}</h4>
                    {valuesPoint(this.props.clusteringSetsPoint.get(cluster))}
                </div>
            }
            else {
                return <div style={resultClusters as React.CSSProperties} key={count++}>
                    <h4>C{count}</h4>
                    {valuesPoint(this.props.clusteringSetsPoint.get(cluster))}
                </div>
            }
        }

        const newSetPoints = () => {
            let arr_ = [];

            for (let cluster of this.props.clusteringSetsPoint.keys()) {
                arr_.push(newClusters(cluster))
            }
            return arr_
        }

        return <div>
            <p>Кластеры входного множества</p>
            <div style={resultClustering as React.CSSProperties} >{newSetPoints()}</div>
        </div>
    }
}