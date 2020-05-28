/**
 * Presentation view.
 * @module components/theme/View/PresentationView
 */

import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Container, Divider, Grid, Card } from 'semantic-ui-react';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';

function speakerListItems(speakers) {

  return speakers.map(speaker => (
    <p>
        <div>{speaker.title} <a href={speaker.twitter_url}>@{speaker.twitter_handle}</a> <img className="ui mini image circular" src={speaker.headshot.download} alt=""/></div>
    </p>
  ));
}

const PresentationView = props => {
  const { content } = props;

  const speakers = speakerListItems(content.speaker);
  return (
    <Container id="page-document">
      <Helmet title={content.title} />
      <h1 className="documentFirstHeading">{content.title}</h1>
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Card fluid='true'>
              <Card.Content>
                <Card.Description>
                  <p>{content.description}</p>
                </Card.Description>
                <Divider />
                <div dangerouslySetInnerHTML={{__html: content.body.data}} />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <h3>Speaker(s)</h3>
            <p>{speakers}</p>

            <h3>Length</h3>
            <p>{content.duration.title}</p>

            <h3>When</h3>
            <p>{content.start}</p>

            <h3>Target audience</h3>
            <div>{
                content.audience.map((e) => {
                return <span>{e.title}</span>;
                }).reduce((prev, curr) => [prev, ', ', curr])
              }
            </div>

            <h3>Target level</h3>
            <p>{content.level.title}</p>

            <h3>Room</h3>
            <p>{content.location}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
PresentationView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    level: PropTypes.shape({
      token: PropTypes.string,
      title: PropTypes.string,
    }),
    audience: PropTypes.array,
    speaker: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        site_root_relative_url : PropTypes.string
      }),
    ),
  }).isRequired,
};

export default injectIntl(PresentationView);
