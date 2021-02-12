import React, { useRef, useState } from 'react';
import Textarea from '../Textarea';
import Upload from '../Upload';
import Input from '../Input';
import Api from '../../Api';
import './style.scss';
const ImgUpload = props => {
  const {
    label,
    onFileChange,
    type = 'img',
    mediaInfo = '',
    field = 'field',
    closeBtn = false,
    disabled = false,
    onClose = () => {},
    onTextChange,
    onTitleChange,
    showTitle = true, // 展示标题输入控件
    showDes = true, // 展示描述内容输入控件
  } = props;

  // 多媒体相关数据
  let mediaData = { src: '', des: '', title: '' };
  if (typeof mediaInfo === 'string') {
    mediaData = mediaInfo ? JSON.parse(mediaInfo) : mediaData;
  } else if (typeof mediaInfo === 'object') {
    mediaData = mediaInfo;
  }

  // 标题和描述控件是否禁用
  let inputDisabledCheck = false;
  if (disabled) {
    inputDisabledCheck = true;
  } else {
    inputDisabledCheck = mediaData.src ? false : true;
  }

  const [inputDisabled, setInputDisabled] = useState(inputDisabledCheck);

  // 图片缩略图盒子
  const imgPreviewRef = useRef(null);
  // 图片文字盒子
  const imgFilename = useRef(null);

  // 选中上传文件的时候触发
  // 同时会生成缩略图
  const fileChange = async (fd, filesSrcList) => {
    if (filesSrcList.length) {
      const length = filesSrcList.length;
      // 获取到的最后一张图片
      const item = filesSrcList[length - 1];

      // 设置图片缩略图
      console.log(item.src);
      imgPreviewRef.current.src = item.src;

      // 调用接口对文件进行上传操作
      if (!fd) return;
      const uploadRes = await Api.uploaderProduct(fd);
      const files = uploadRes.data.files;
      onFileChange && onFileChange({ field, files });

      setInputDisabled(false);
    }
  };

  // 关闭上传控件
  const closeHandle = () => {
    onClose && onClose();
  };

  // 改变标题
  const titleChange = value => {
    onTitleChange && onTitleChange(value);
  };

  // 改变描述内容
  const desChange = value => {
    onTextChange && onTextChange(value);
  };

  return (
    <div className="UI-ImgUpload">
      <div className="UI-ImgUpload--lable">{label}</div>
      <div className="UI-ImgUpload--preview">
        <img ref={imgPreviewRef} alt="图片预览" src={mediaData.src ? mediaData.src : '/public/img/upload.png'} />
        {/* 关闭图标 */}
        {closeBtn && (
          <div onClick={closeHandle} className="UI-ImgUpload--close">
            <span className="UI-ImgUpload--close-btn"></span>
          </div>
        )}
      </div>
      <div ref={imgFilename} className="UI-ImgUpload--text">
        {showTitle && (
          <Input
            disabled={inputDisabled}
            className={`UI-ImgUpload--title`}
            value={mediaData.title}
            onChange={titleChange}
            placeholder="请输入标题"
          />
        )}
        {showDes && <Textarea disabled={inputDisabled} placeholder={'请输入描述内容'} value={mediaData.des} onChange={desChange} />}
      </div>
      <Upload disabled={disabled} folder={type} onChange={(fd, filesSrcList) => fileChange(fd, filesSrcList)} text="上传文件" />
    </div>
  );
};

export default ImgUpload;
