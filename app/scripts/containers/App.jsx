import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Helmet from 'react-helmet';
import cx from 'classnames';
import history from 'modules/history';
import RoutePublic from 'modules/RoutePublic';
import RoutePrivate from 'modules/RoutePrivate';

import config from 'config';
import { showAlert, closeMenu } from 'actions';

import Home from 'routes/Home';
import Private from 'routes/Private';
import NotFound from 'routes/NotFound';

import Header from 'components/Header';
import Footer from 'components/Footer';
import SystemAlerts from 'components/SystemAlerts';
import ReactDrawer from 'react-drawer';

export class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.onDrawerClose = this.onDrawerClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, user } = this.props;
    const { user: nextUser } = nextProps;

    /* istanbul ignore else */
    if (!user.isAuthenticated && nextUser.isAuthenticated) {
      dispatch(showAlert('Hello! And welcome!', { type: 'success', icon: 'i-trophy' }));
      
    }
  }

  onDrawerClose() {
    this.props.dispatch(closeMenu());
  }

  render() {
    const { app, dispatch, user } = this.props;

    return (
      <ConnectedRouter history={history}>
        <div
          className={cx('app', {
            'app--private': user.isAuthenticated,
          })}
        >
          <Helmet
            defer={false}
            htmlAttributes={{ lang: 'pt-br' }}
            encodeSpecialCharacters={true}
            defaultTitle={config.title}
            titleTemplate={`%s | ${config.name}`}
            titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
          />
          <Header dispatch={dispatch} user={user} />
          <main className="app__main">
            <Switch>
              <RoutePublic isAuthenticated={user.isAuthenticated} path="/" exact component={Home} />
              <RoutePrivate isAuthenticated={user.isAuthenticated} path="/private" component={Private} />
              <Route component={NotFound} />
            </Switch>
            <ReactDrawer
              open={this.props.app.open}
              position="left"
              onClose={this.onDrawerClose}
              noOverlay={false}>
              <h2>What a nice drawer !</h2>
            </ReactDrawer>
          </main>
          <Footer />
          
          <SystemAlerts alerts={app.alerts} dispatch={dispatch} />
        </div>
      </ConnectedRouter>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
