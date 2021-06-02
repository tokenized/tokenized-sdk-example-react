import React from 'react';

export default function TutorialPage() {
  return (
    <section className="section">
      <h1 className="title">Tutorial sandbox</h1>
      <div className="columns">
        <div className="column is-half">
          <div className="box">
            <h2 className="title is-5">Asset summary</h2>
            <div className="field is-grouped is-grouped-multiline">
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Asset 1</span>
                  <span className="tag is-info">$11.11</span>
                </div>
              </div>
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Asset 2</span>
                  <span className="tag is-success">$22.22</span>
                </div>
              </div>
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Asset 3</span>
                  <span className="tag is-primary">$33.33</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
