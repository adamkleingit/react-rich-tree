import { configure, addDecorator, setAddon } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';

function loadStories() {
  require('../stories');
}

setOptions({ downPanelInRight: true });
addDecorator(withKnobs);
configure(loadStories, module);
