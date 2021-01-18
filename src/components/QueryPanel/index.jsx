import { useState, useEffect, useCallback } from 'react';
import Select from '../Select';
import MultipleSelect from '../MultipleSelect';
import Input from '../Input';
import CheckBox from '../CheckBox';
import Switch from '../Switch';
import Button from '../Button';
import FormItem from '../FormItem';
import './style.scss';
import { isBoolean } from 'lodash';

/**
 * 根据类型输出不同的控件
 * @param config 控件的相关配置
 */

const FormType = props => {
  const { config } = props;
  switch (config.type) {
    case 'input':
      return <Input {...config.props} />;
    case 'select':
      return <Select {...config.props} />;
    case 'mulselect':
      return <MultipleSelect {...config.props} />;
    case 'checkbox':
      return <CheckBox {...config.props} data-item="123" />;
    case 'switch':
      return <Switch {...config.props} />;
    default:
      return null;
  }
};

/* 查询面板组件 */
const QueryPanel = props => {
  const defaultConfigList = [
    {
      type: 'input',
      label: '输入控件1',
      field: 'key1',
      props: {
        value: '默认值',
        placeholder: '请输入',
        disabled: false,
      },
    },
    {
      type: 'select',
      label: '单选控件',
      field: 'key2',
      props: {
        placeholder: '请选择',
        type: '',
        value: { label: '选项2', value: '02' },
        options: [
          { label: '选项1', value: '01' },
          { label: '选项2', value: '02' },
          { label: '选项3', value: '03' },
        ],
      },
    },
    {
      type: 'input',
      label: '输入控件2',
      field: 'key3',
      props: {
        value: '默认值',
        placeholder: '请输入',
        disabled: false,
      },
    },
    {
      type: 'mulselect',
      label: '多选控件',
      field: 'key4',
      props: {
        placeholder: '多选请选择',
        value: [
          { label: '选项2', value: '02' },
          { label: '选项3', value: '03' },
        ],
        options: [
          { label: '选项1', value: '01' },
          { label: '选项2', value: '02' },
          { label: '选项3', value: '03' },
          { label: '选项4', value: '04' },
          { label: '选项5', value: '05' },
          { label: '选项6', value: '06' },
        ],
      },
    },
    {
      type: 'checkbox',
      label: '复选框',
      field: 'key5',
      props: {
        checked: true,
        value: '01',
        disabled: false,
        id: '999',
      },
    },
    {
      type: 'switch',
      label: '复选框',
      field: 'key6',
      props: {
        checked: true,
        value: '01',
        disabled: false,
        id: '666',
      },
    },
  ];
  const { configList = defaultConfigList, onQueryClick = () => {} } = props;

  // 配置列表
  const [configmation, setConfigmation] = useState(configList);

  // 查询结果集
  const [queryData, setQueryData] = useState({});

  const initConfigMation = useCallback(() => {
    const configmationData = [...configList];
    configmationData.forEach(config => {
      const field = config.field;
      const query = { ...queryData };
      const type = config.type;

      const onChange = value => {
        value = typeof value === 'string' ? value.trim() : value;
        if (type === 'checkbox' || type === 'switch' || type === 'radio') {
          config.props.checked = value;
        } else {
          config.props.value = value;
        }

        query[field] = value;
        setQueryData(query);
        config.onChange && config.onChange(value);
      };
      config.props.onChange = onChange;
    });

    setConfigmation(configmationData);
  }, [configList, queryData]);

  useEffect(() => {
    initConfigMation();
  }, [initConfigMation]);

  return (
    <div className="UI-QueryPanel">
      <div className="UI-QueryPanel__input-contain">
        {configmation.map((config, index) => (
          <FormItem key={`${index}${config.label}`} label={config.label}>
            <FormType config={config} />
          </FormItem>
        ))}
      </div>
      <div className="UI-QueryPanel__button-contain">
        <Button
          onClick={() => {
            onQueryClick && onQueryClick(queryData);
          }}
          text="查询"
        />
      </div>
    </div>
  );
};

export default QueryPanel;
