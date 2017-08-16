import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'

import history from './history.js'

class Home extends React.Component
{
    render()
    {
        return (
            <div className="container">

                <h2>Home</h2>

                <p className="lead">A hacker puzzle based in React.</p>

                <p><Link to="/start" className="btn">Click here</Link> to start</p>

            </div>
        )
    }
}

class Start extends React.Component
{
    render()
    {
        return (
            <div className="container">

                <h2>Start</h2>

                <p className="lead">Use the page clues to guess the next pages answer, and enter your answer into the URL bar. If your answer is correct, the next page clue will be presented.</p>

                <p className="lead text-info">There is a Google search bar which you can use to help.</p>

                <Link to={ `page/1` } className="btn btn-primary">Start</Link>

            </div>
        )
    }
}

class Page extends React.Component
{
    PAGES = [
        { id: 0, key: '1', clue: 'one' },
        { id: 1, key: 'two', clue: '22' },
        { id: 2, key: '333', clue: 'eerht', },
        { id: 3, key: 'ruof', clue: 'iv' },
        { id: 4, key: 'v', clue: 'ffiivvee' },
        { id: 5, key: 'ssiixx', clue: 'sat' },
        { id: 6, key: 'sun', clue: 'sept' },
        { id: 7, key: 'huit', clue: 'ocho' },
        { id: 8, key: 'nueve', clue: 'neun' },
        { id: 9, key: 'zehn', clue: ' ' }
    ];

    getIndex(value, array, property)
    {
        for (let i = 0; i < array.length; i++) {
            if (array[i][property] === value) {
                return i;
            }
        }

        return -1;
    }

    render()
    {
        let PAGE_INDEX = this.getIndex(this.props.match.params.pageKey, this.PAGES, 'key');
        let PAGE = this.PAGES[PAGE_INDEX];

        return (
            <div className="container">

                <div className="content">

                    { PAGE_INDEX >= 0 ?
                        <h1 className="text-center">Next page clue: <br /><span className="small text-muted">{ PAGE['clue'] }</span></h1>
                        :
                        <h1 className="text-center">Oops, that doesn't look correct: <br /><span className="small text-muted">{ this.props.match.params.pageKey }</span></h1>
                    }

                </div>

                <button onClick={ history.goBack } className="btn btn-secondary">Back</button>

            </div>
        )
    }
}

class NotFound extends React.Component
{
    render()
    {
        return (
            <div className="container">

                <h3>No match for <code>{ this.props.location.pathname }</code></h3>

            </div>
        )
    }
}

const App = () => (
    <Router history={history}>

        <div>

            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">

                <a className="navbar-brand" href="/">React Hacker Puzzle</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">

                    <span className="navbar-toggler-icon">&nbsp;</span>

                </button>

                <div className="collapse navbar-collapse">

                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item">

                            <Link to="/" className="nav-link">Home</Link>

                        </li>

                        <li className="nav-item">

                            <Link to="/start" className="nav-link">Start</Link>

                        </li>

                    </ul>

                </div>

            </nav>

            <Switch>

                <Route exact path="/" component={ Home }/>
                <Route path="/start" component={ Start }/>
                <Route path={ `/page/:pageKey` } component={ Page }/>
                <Route component={ NotFound }/>

            </Switch>

            <footer className="footer">

                <div className="container">

                    <h4>Need some help?</h4>

                    <div className="container">

                        <form method="get" action="http://www.google.com/search" target="__blank">

                            <div className="form-group row">

                                <div className="input-group input-group-lg">

                                    <input type="text" className="form-control" id="q" name="q" placeholder="Google search" maxLength="255" />

                                    <span className="input-group-btn">

                                            <button type="submit" className="btn btn-primary" title="Go!">Go!</button>

                                        </span>

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </footer>

        </div>

    </Router>
)

export default App
