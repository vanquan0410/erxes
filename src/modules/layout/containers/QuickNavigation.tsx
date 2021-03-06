import client from 'apolloClient';
import { AppConsumer } from 'appContext';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { Alert, getCookie, setCookie, withProps } from 'modules/common/utils';
import { queries as generalQueries } from 'modules/settings/general/graphql';
import React from 'react';
import { graphql } from 'react-apollo';
import QuickNavigation from '../components/QuickNavigation';

type Props = {
  getEnvQuery: any;
};

type State = {
  selectedBrands: string[];
};

class QuickNavigationContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const cookieValue = getCookie('scopeBrandIds');

    this.state = { selectedBrands: cookieValue ? JSON.parse(cookieValue) : [] };
  }

  logout = () => {
    client
      .mutate({
        mutation: gql`
          mutation {
            logout
          }
        `
      })

      .then(() => {
        window.location.href = '/';
      })
      .catch(error => {
        Alert.error(error.message);
      });
  };

  setValues = (selectedBrands: string[]) => {
    this.setState({ selectedBrands }, () => {
      setCookie('scopeBrandIds', JSON.stringify(this.state.selectedBrands));
      window.location.reload();
    });
  };

  onChangeBrands = (value: string) => {
    const { selectedBrands } = this.state;

    if (selectedBrands.includes(value)) {
      return this.setValues(selectedBrands.filter(i => i !== value));
    }

    return this.setValues(selectedBrands.concat(value));
  };

  render() {
    const { getEnvQuery } = this.props;
    const config = getEnvQuery.configsGetEnv || {};

    return (
      <AppConsumer>
        {({ currentUser }) =>
          currentUser && (
            <QuickNavigation
              showBrands={config.USE_BRAND_RESTRICTIONS === 'true'}
              onChangeBrands={this.onChangeBrands}
              selectedBrands={this.state.selectedBrands}
              logout={this.logout}
              currentUser={currentUser}
            />
          )
        }
      </AppConsumer>
    );
  }
}

export default withProps(
  compose(
    graphql(gql(generalQueries.configsGetEnv), {
      name: 'getEnvQuery',
      options: () => ({
        fetchPolicy: 'network-only'
      })
    })
  )(QuickNavigationContainer)
);
