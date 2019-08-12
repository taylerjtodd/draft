import React, { Component } from "react";
import ReactDOM from "react-dom";
import Team from "../presentational/Team.jsx";
import Board from "../presentational/Board.jsx";

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: window.location.hash
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
        currentTab: event.currentTab
      });
    console.log(this.state)
  }

  render() {
    const { currentTab } = this.state;
    return (
        <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    {currentTab === '#board' ? (
                        <a className="nav-link active"
                            id="home-tab" data-toggle="tab" href="#board"
                            role="tab" aria-controls="home" aria-selected="true">
                                Board</a>
                    ) : (
                        <a className="nav-link"
                            id="home-tab" data-toggle="tab" href="#board" onClick={() => this.handleChange({currentTab: '#board'})}
                            role="tab" aria-controls="home" aria-selected="true">
                                Board</a>
                    )}
                </li>
                <li className="nav-item">
                    {currentTab === '#team' ? (
                        <a className="nav-link active"
                            id="home-tab" data-toggle="tab" href="#team"
                            role="tab" aria-controls="home" aria-selected="true">
                                Team</a>
                    ) : (
                        <a className="nav-link"
                            id="home-tab" data-toggle="tab" href="#team" onClick={() => this.handleChange({currentTab: '#team'})}
                            role="tab" aria-controls="home" aria-selected="true">
                                Team</a>
                    )}
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                {currentTab === '#board' ? (
                <div className="tab-pane fade show active" id="board" role="tabpanel" aria-labelledby="home-tab">
                    <Board/>
                </div>
                ) :(
                <div className="tab-pane fade" id="board" role="tabpanel" aria-labelledby="home-tab">
                    <Board/>
                </div>
                )}
                {currentTab === '#team' ? (
                <div className="tab-pane fade show active" id="team" role="tabpanel" aria-labelledby="home-tab">
                    <Team
                        text="SEO title"
                        label="seo_title"
                        type="text"
                        id="seo_title"
                        value={currentTab}
                        handleChange={this.handleChange}
                        />
                </div>
                ) :(
                <div className="tab-pane fade" id="team" role="tabpanel" aria-labelledby="home-tab">
                    <Team
                        text="SEO title"
                        label="seo_title"
                        type="text"
                        id="seo_title"
                        value={currentTab}
                        handleChange={this.handleChange}
                        />
                </div>
                )}
            </div>
      </div>
    );
  }
}
export default FormContainer;

const wrapper = document.getElementById("body");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;