import React from "react";
import { PieChart } from "react-minimal-pie-chart";

class Clothes extends React.Component {
  render() {
    return (
      <div className="clothesPanel">
        <div className="clothes-title">Favourite Warmer</div>
        <PieChart
          className="pieChart"
          data={[
            { title: "Jacket", value: 171, color: "#000000" },
            { title: "Hoodie", value: 153, color: "#0000FF" },
            { title: "Raincoat", value: 171, color: "#6A2135" },
            { title: "Sweater", value: 170, color: "#E74C3C" },
            { title: "Blazer", value: 146, color: "#F1C40F" },
            { title: "Jumper", value: 189, color: "#239B56 " },
          ]}
        />
      </div>
    );
  }
}

export default Clothes;
