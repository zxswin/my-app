import { action } from 'mobx';
import { observer } from 'mobx-react';
import FormItem from '../../../../../../components/FormItem';
import Input from '../../../../../../components/Input';
import ImgUpload from '../../../../../../components/ImgUpload';
import MultipleImgUpload from '../../../../../../components/MultipleImgUpload';
import './style.scss';

const OperationPanel = props => {
  const { panelData = {}, type } = props;

  // 基本信息的修改
  const valueChangeHandel = action((value, field) => {
    panelData[field] = value;
  });

  // 选择要上传的文件
  const onFileChange = action(fileData => {
    console.log('files文件上传成功', fileData);
    const { field, files } = fileData;

    if (field !== 'slide_imgs') {
      panelData[field] = files[files.length - 1].filename;
    }
  });

  // 多文件上传
  const multipleFileChange = action((fileData, index) => {
    console.log('files多文件上传成功', fileData);
    const field = fileData.field;
    const fileList = JSON.parse(panelData[field]);
    const files = fileData.files;
    const fileItem = {
      src: files[files.length - 1].filename,
    };

    if (!fileList[index]) {
      fileList.push(fileItem);
    } else {
      fileList[index] = fileItem;
    }

    panelData[field] = JSON.stringify(fileList);
  });

  // 多文件上传关闭某个上传控件
  const multipleFileClose = action((index, field) => {
    const fileList = JSON.parse(panelData[field]);
    if (fileList[index]) {
      fileList.splice(index, 1);
    }

    console.log('fileList', fileList);
    panelData[field] = JSON.stringify(fileList);
  });

  return (
    <div className="Product-Fish__OperationPanel">
      <h2>基本信息</h2>
      <div className="Product__OperationPanel__input">
        <FormItem label="产品id">
          <Input placeholder="产品id" disabled={true} value={panelData.id} onChange={value => valueChangeHandel(value, 'id')} />
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
      </div>
      <h2>图片视频信息</h2>

      <div className="Product__OperationPanel__img">
        <ImgUpload
          field="icon_url"
          src={panelData.icon_url}
          type={panelData.type}
          label="图片缩略图"
          onFileChange={fileData => onFileChange(fileData)}
          text="上传图片"
          disabled={type === 'detail'}
        />
        <ImgUpload
          field="video_url"
          src={panelData.icon_url}
          type={panelData.type}
          label="视频上传"
          onFileChange={fileData => onFileChange(fileData)}
          text="上传视频"
          disabled={type === 'detail'}
        />
      </div>
      <h2>幻灯片大图信息</h2>
      <div className="Product__OperationPanel__img">
        <MultipleImgUpload
          fileList={panelData.slide_imgs}
          field="slide_imgs"
          type={panelData.type}
          label="幻灯片焦点图"
          onFileChange={(fileData, index) => multipleFileChange(fileData, index)}
          onFileClose={(index, field) => multipleFileClose(index, field)}
          text="上传图片"
          disabled={type === 'detail'}
        />
      </div>

      <h2>内容区图片信息</h2>
      <div className="Product__OperationPanel__img">
        <MultipleImgUpload
          fileList={panelData.content}
          field="content"
          type={panelData.type}
          label="内容区图片"
          onFileChange={(fileData, index) => multipleFileChange(fileData, index)}
          onFileClose={(index, field) => multipleFileClose(index, field)}
          text="上传图片"
          disabled={type === 'detail'}
        />
      </div>
    </div>
  );
};

export default observer(OperationPanel);
