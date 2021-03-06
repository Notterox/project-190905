import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Classes,
  ControlGroup,
  FormGroup,
  H4,
  InputGroup,
  NumericInput,
  ButtonGroup,
  Popover,
  Button,
  Menu,
  Position, Alignment
} from '@blueprintjs/core';

import './AlgorithmSettings.scss';

export default class AlgorithmSettings extends Component {
  static propTypes = {
    className: PropTypes.string,
    settings: PropTypes.shape({
      targetFunction: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        latex: PropTypes.string,
        func: PropTypes.string
      }),
      xmin: PropTypes.number,
      xmax: PropTypes.number,
      ymin: PropTypes.number,
      ymax: PropTypes.number
    }),
    funcSelectorDisabled: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    className: '',
    settings: {
      targetFunction: {},
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10
    },
    onChange: null,
    funcSelectorDisabled: false
  };

  updateState = (state) => {
    if (this.props.onChange) {
      this.props.onChange({ ...this.props.settings, ...state });
    }
  };

  handleValueChange = (field, val) => this.updateState({ [field]: val });

  handleSelectFn = fnId => () => {
    const fd = this.functionDescription[fnId];
    this.updateState({
      targetFunction: fd,
      xmin: fd.min,
      xmax: fd.max,
      ymin: fd.min,
      ymax: fd.max
    });
  };

  // eslint-disable-next-line react/sort-comp
  functionDescription = {
    test: {
      id: 'test',
      name: 'Тест',
      latex: '$f(x, y) = 6(x+5)^2+7(y-3)^2$',
      func: '(x, y) => 6 * Math.pow(x + 5, 2) + 7 * Math.pow(y - 3, 2)',
      min: -10,
      max: 10,
      step: 0.2,
      minPoint: [-5, 3]
    },
    example1: {
      id: 'example1',
      name: 'Пример 1',
      latex: [
        '$z_1(x_1, x_2)=7|x_1|^2+7|x_2|^2,$',
        '$z_2(x_1, x_2)=5|x_1-3|^{0.8}+5|x_2-3|^{0.6}+6,$',
        '$z_3(x_1, x_2)=5|x_1-6|^{1.3}+5|x_2-3|^{1.3}+2,$',
        '$z_4(x_1, x_2)=5|x_1-6|^1+5|x_2+6|^1+8,$',
        '$z_5(x_1, x_2)=4|x_1+6|^{1.5}+4|x_2+6|^{1.5}+7,$',
        '$z_6(x_1, x_2)=5|x_1+3|^{1.8}+5|x_2|^{1.8}+9,$',
        '$z_7(x_1, x_2)=6|x_1+6|^{0.6}+6|x_2-6|^{0.9}+4,$',
        '',
        '$\\mathit{I(x)=min\\{z_i(x),i=}\\overline{1,7}\\mathit{\\}}$'
      ],
      func: `(x, y) => Math.min(
        7*x*x + 7*y*y,
        5 * Math.pow(Math.abs(x - 3), 0.8) + 5 * Math.pow(Math.abs(y - 3), 0.6) + 6,
        5 * Math.pow(Math.abs(x - 6), 1.3) + 5 * Math.pow(Math.abs(y - 6), 1.3) + 2,
        5 * Math.pow(Math.abs(x - 6), 1) + 5 * Math.pow(Math.abs(y + 6), 1) + 8,
        4 * Math.pow(Math.abs(x + 6), 1.5) + 4 * Math.pow(Math.abs(y + 6), 1.5) + 7,
        5 * Math.pow(Math.abs(x + 3), 1.8) + 5 * Math.pow(Math.abs(y), 1.8) + 9,
        6 * Math.pow(Math.abs(x + 6), 0.6) + 6 * Math.pow(Math.abs(y - 6), 0.9) + 4
      )`,
      min: -15,
      max: 15,
      step: 0.2,
      minPoint: [0, 0]
    },
    example2: {
      id: 'example2',
      name: 'Пример 2',
      latex: [
        '$z_1(x_1, x_2)=6|x_1|^2+7|x_2|^2,$',
        '$z_2(x_1, x_2)=5|x_1+2|^{0.5}+5|x_2|^{0.5}+6,$',
        '$z_3(x_1, x_2)=5|x_1|^{1.3}+5|x_2+2|^{1.3}+5,$',
        '$z_4(x_1, x_2)=4|x_1|^{0.8}+3|x_2-4|^{1.2}+8,$',
        '$z_5(x_1, x_2)=6|x_1-2|^{1.1}+4|x_2-2|^{1.7}+7,$',
        '$z_6(x_1, x_2)=5|x_1-4|^{1.1}+5|x_2|^{1.8}+9,$',
        '$z_7(x_1, x_2)=6|x_1-4|^{0.6}+7|x_2-4|^{0.6}+4,$',
        '$z_8(x_1, x_2)=6|x_1+4|^{0.6}+6|x_2-4|^{1.6}+3,$',
        '$z_9(x_1, x_2)=3|x_1+4|^{1.2}+3|x_2+4|^{0.6}+7.5,$',
        '$z_10(x_1, x_2)=2|x_1-3|^{0.9}+4|x_2+5|^{0.3}+8.5,$',
        '',
        '$\\mathit{I(x)=min\\{z_i(x),i=}\\overline{1,10}\\mathit{\\}}$'
      ],
      func: `(x, y) => Math.min(
        6 * x * x + 7 * y * y,
        5 * Math.pow(Math.abs(x + 2), 0.5) + 5 * Math.pow(Math.abs(y), 0.5) + 6,
        5 * Math.pow(Math.abs(x), 1.3) + 5 * Math.pow(Math.abs(y + 2), 1.3) + 5,
        4 * Math.pow(Math.abs(x), 0.8) + 3 * Math.pow(Math.abs(y - 4), 1.2) + 8,
        6 * Math.pow(Math.abs(x - 2), 1.1) + 4 * Math.pow(Math.abs(y - 2), 1.7) + 7,
        5 * Math.pow(Math.abs(x - 4), 1.1) + 5 * Math.pow(Math.abs(y), 1.8) + 9,
        6 * Math.pow(Math.abs(x - 4), 0.6) + 7 * Math.pow(Math.abs(y - 4), 0.6) + 4,
        6 * Math.pow(Math.abs(x + 4), 0.6) + 6 * Math.pow(Math.abs(y - 4), 1.6) + 3,
        3 * Math.pow(Math.abs(x + 4), 1.2) + 3 * Math.pow(Math.abs(y + 4), 0.5) + 7.5,
        2 * Math.pow(Math.abs(x - 3), 0.9) + 4 * Math.pow(Math.abs(y + 5), 0.3) + 8.5
      )`,
      min: -15,
      max: 15,
      step: 0.2,
      minPoint: [0, 0]
    },
    example3: {
      name: 'Пример 3',
      latex: ''
    },
    rastrigin: {
      id: 'rastrigin',
      name: 'Функция Растригина',
      latex: '$f(x_1, x_2)=(x_1^2-10cos(2\\pi x_1)) + (x_2^2-10cos(2\\pi x_2)) + 20$',
      func: '(x, y) => (x*x - 10 * Math.cos(2 * Math.PI * x)) + (y*y - 10 * Math.cos(2 * Math.PI * y)) + 20',
      min: -5.12,
      max: 5.12,
      step: 0.05,
      minPoint: [0, 0]
    },
    rosenbrock: {
      id: 'rosenbrock',
      name: 'Функция Розенброка',
      latex: '$\\mathit{f(x_1, x_2)}=100(x_2 - x_1^2)^2 + (x_1 - 1)^2$',
      func: '(x, y) => 100 * Math.pow(y - x*x, 2) + Math.pow(x - 1, 2)',
      min: -2.5,
      max: 2.5,
      step: 0.1,
      minPoint: [1, 1]
    },
    easom: {
      id: 'easom',
      name: 'Функция Изома',
      latex: '$\\mathit{f(x, y)}=-cos(x)cos(y)exp(-((x - \\pi )^2 + (y - \\pi )^2))$',
      func: '(x, y) => -Math.cos(x) * Math.cos(y) * Math.exp(-(Math.pow(x - Math.PI, 2) + Math.pow(y - Math.PI, 2)))',
      min: -50,
      max: 50,
      step: 0.2,
      minPoint: [Math.PI, Math.PI]
    }
  };

  functionSelectMenu = (
    <Menu>
      <Menu.Item icon="edit" text="Задать..." />
      <Menu.Divider title="Примеры" />
      <Menu.Item text="Тест" onClick={this.handleSelectFn('test')} />
      <Menu.Item text="Пример 1" onClick={this.handleSelectFn('example1')} />
      <Menu.Item text="Пример 2" onClick={this.handleSelectFn('example2')} />
      <Menu.Item text="Пример 3" onClick={this.handleSelectFn('example3')} />
      <Menu.Divider title="Тестовые функции" />
      <Menu.Item text="Функция Растригина" onClick={this.handleSelectFn('rastrigin')} />
      <Menu.Item text="Функция Розенброка" onClick={this.handleSelectFn('rosenbrock')} />
      <Menu.Item text="Функция Изома" onClick={this.handleSelectFn('easom')} />
    </Menu>
  );

  render() {
    const { settings } = this.props;

    return (
      <div className={`AlgorithmSettings ${this.props.className}`}>
        <Card>
          <H4>Настройка задачи оптимизации</H4>
          <FormGroup
            label="Функция"
          >
            <Popover content={this.functionSelectMenu} position={Position.BOTTOM} fill>
              <Button alignText={Alignment.LEFT} small rightIcon="caret-down" fill loading={this.props.funcSelectorDisabled}>
                { this.functionDescription[settings.targetFunction.id]
                  ? settings.targetFunction.name
                  : 'Выбрать'
                }
              </Button>
            </Popover>
          </FormGroup>
          <FormGroup
            label="X"
            labelFor="x-input"
          >
            <ControlGroup fill>
              <InputGroup
                placeholder="Xmin"
                value={settings.xmin}
                small
                onChange={e => this.handleValueChange('xmin', e.target.value)}
              />
              <InputGroup
                placeholder="Xmax"
                value={settings.xmax}
                small
                onChange={e => this.handleValueChange('xmax', e.target.value)}
              />
            </ControlGroup>
          </FormGroup>
          <FormGroup
            label="Y"
            labelFor="y-input"
          >
            <ControlGroup fill>
              <InputGroup
                placeholder="Ymin"
                value={settings.ymin}
                small
                onChange={e => this.handleValueChange('ymin', e.target.value)}
              />
              <InputGroup
                placeholder="Ymax"
                value={settings.ymax}
                small
                onChange={e => this.handleValueChange('ymax', e.target.value)}
              />
            </ControlGroup>
          </FormGroup>
        </Card>
      </div>
    );
  }
}
