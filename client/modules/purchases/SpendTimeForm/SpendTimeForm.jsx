import {forbidExtraProps} from 'airbnb-prop-types';
import React from 'react';

import logger from '/lib/logger';
import {create} from '/lib/modules/purchases';

import {css, withStyles, styleType, themeType} from '/client/styles/withStyles';

import ActivitySelect from '/client/modules/activities/ActivitySelect';

import HoursInput from './HoursInput';
import MinutesInput from './MinutesInput';

const SpendTimeForm = ({styles}) => {
  const spendTime = (event) => {
    event.preventDefault();
    const form = event.target;
    const hours = Number.parseInt(form.hours.value || 0, 10);
    const minutes = Number.parseInt(form.minutes.value || 0, 10);
    const activityId = form.activityId.value;

    const timeSpent = (hours * 60) + minutes;

    if (timeSpent) {
      create.call({activityId, timeSpent}, logger.error);
    }
  };

  return (
    <form {...css(styles.form)} onSubmit={spendTime}>
      <div {...css(styles.formInner)} >
        <ActivitySelect />
        <div {...css(styles.time)}>
          <HoursInput />
          <MinutesInput />
        </div>
        <button {...css(styles.button)}>
          Spend
        </button>
      </div>
    </form>
  );
};

SpendTimeForm.displayName = 'SpendTimeForm';

SpendTimeForm.propTypes = forbidExtraProps({
  styles: styleType.isRequired,
  theme: themeType.isRequired,
});

export default withStyles(({colors, units}) => ({
  button: {
    width: '100%',
    padding: units(1),
  },

  form: {
    position: 'fixed',
    zIndex: 100,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.black,
  },

  formInner: {
    width: '80%',
    maxWidth: units(31),
    padding: `${units(1)} 0`,
    margin: '0 auto',
  },

  time: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: `${units(1)} 0`,
  },
}))(SpendTimeForm);