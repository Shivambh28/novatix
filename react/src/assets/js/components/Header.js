// import React from "react";

// import Title from "./Header/Title";

// export default class Header extends React.Component {
//   handleChange(e) {
//     const title = e.target.value;
//     this.props.changeTitle(title);
//   }

//   render() {
//     return (
//       <div>
//         <Title title={this.props.title} />
//         <input value={this.props.title} onChange={this.handleChange.bind(this)} />
//       </div>
//     );
//   }
// }


import React from "react";

//import Title from "./Header/Title";

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <img class="logo" src="./assets/img/novatix_logo.svg" />

        <form action="">
        <div class="searchbox">
        <input type="text" placeholder="Enter Name or Venue" class="search-box" id="search-box" />

        </div>

        <input type="submit" value="" id="search-btn" /> 
        </form>

        <div class="back" id="back_btn"></div>
        <div class="clear hidden"></div>
        <div class="cancel hidden">CANCEL</div>
      </header>
    );
  }
}
