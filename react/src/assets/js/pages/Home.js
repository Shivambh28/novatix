import React from "react";

import HomeSlider from "../components/Home/Slider/Slider";
import HappeningToday from "../components/Home/HappeningToday/HappeningToday";

export default class Home extends React.Component {
  render() {
    return (
      <div class="page" id="home">
        <HomeSlider />
        <HappeningToday />
      </div>
    );
  }
}
