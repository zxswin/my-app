import { useState } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import FormItem from '../../../../../../components/FormItem';
import Input from '../../../../../../components/Input';
import Upload from '../../../../../../components/Upload';
import Button from '../../../../../../components/Button';
import { uploaderProduct } from '../../../../../Api';
import './style.scss';

const OperationPanel = props => {
  const { panelData = {}, type } = props;

  const [fileData, setFileData] = useState(null);

  // 基本信息的修改
  const valueChangeHandel = action((value, field) => {
    panelData[field] = value;
  });

  // 选择要上传的文件
  const onFileChange = (fd, filesSrcList) => {
    console.log('要上传的文件', fd);
    console.log('文件信息列表', filesSrcList);

    setFileData(fd);
  };

  // 点击上传文件
  const uploadClick = async () => {
    console.log('点击上传文件');
    if (!fileData) return;

    const uploadRes = await uploaderProduct(fileData, progressEvent => {
      console.log('progressEvent上传进度事件', progressEvent);
    });

    console.log('uploadRes', uploadRes);
  };

  return (
    <div className="Product-Fish__OperationPanel">
      <h2>基本信息</h2>
      <div className="Product__OperationPanel__input">
        <FormItem label="产品id">
          <Input disabled={false} value={panelData.id} onChange={value => valueChangeHandel(value, 'id')} />
        </FormItem>
        <FormItem label="产品名称">
          <Input disabled={type === 'detail'} value={panelData.name} onChange={value => valueChangeHandel(value, 'name')} />
        </FormItem>
        <FormItem label="产品排列顺序">
          <Input disabled={type === 'detail'} value={panelData.order} onChange={value => valueChangeHandel(value, 'order')} />
        </FormItem>
        <FormItem label="产品库存">
          <Input disabled={type === 'detail'} value={panelData.stock} onChange={value => valueChangeHandel(value, 'stock')} />
        </FormItem>
        <FormItem label="产品销量">
          <Input disabled={type === 'detail'} value={panelData.sales_volume} onChange={value => valueChangeHandel(value, 'sales_volume')} />
        </FormItem>
        <FormItem label="产品类型">
          <Input disabled={type === 'detail'} value={panelData.type} onChange={value => valueChangeHandel(value, 'type')} />
        </FormItem>
        <FormItem label="产品状态">
          <Input disabled={type === 'detail'} value={panelData.status} onChange={value => valueChangeHandel(value, 'status')} />
        </FormItem>
      </div>
      <h2>描述信息</h2>
      <div className="Product__OperationPanel__textarea">
        <FormItem label="产品描述">
          <Input disabled={type === 'detail'} value={panelData.describe} onChange={value => valueChangeHandel(value, 'describe')} />
        </FormItem>
        <FormItem label="产品标准规格">
          <Input disabled={type === 'detail'} value={panelData.standard} onChange={value => valueChangeHandel(value, 'standard')} />
        </FormItem>
        <FormItem label="产品内容">
          <Input disabled={type === 'detail'} value={panelData.content} onChange={value => valueChangeHandel(value, 'content')} />
        </FormItem>
      </div>
      <h2>图片视频信息</h2>
      <div className="Product__OperationPanel__img">
        <img alt="图标" src={panelData.icon_url} />
        <FormItem label="产品图标上传">
          <Upload onChange={(fd, filesSrcList) => onFileChange(fd, filesSrcList)} text="上传文件" />
          <Button onClick={uploadClick} text="文件上传" />
        </FormItem>
        <FormItem label="产品视频">
          <Input value={panelData.video_url} onChange={() => {}} />
        </FormItem>
      </div>
      <h2>幻灯片大图信息</h2>
      <div className="Product__OperationPanel__img">
        <FormItem label="幻灯片图片集">
          <Input value={panelData.slide_imgs} onChange={() => {}} />
        </FormItem>
        <FormItem label="幻灯片图片集">
          <Input value={panelData.slide_imgs} onChange={() => {}} />
        </FormItem>
        <FormItem label="幻灯片图片集">
          <Input value={panelData.slide_imgs} onChange={() => {}} />
        </FormItem>
        <FormItem label="幻灯片图片集">
          <Input value={panelData.slide_imgs} onChange={() => {}} />
        </FormItem>
        <FormItem label="幻灯片图片集">
          <Input value={panelData.slide_imgs} onChange={() => {}} />
        </FormItem>
      </div>
    </div>
  );
};

export default observer(OperationPanel);
