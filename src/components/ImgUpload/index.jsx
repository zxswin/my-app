import React, { useRef } from 'react';
import Upload from '../Upload';
import { uploaderProduct } from '../../pages/Api';
import './style.scss';
const ImgUpload = props => {
  const { label, onFileChange, type = 'img', src = '', field = 'field', closeBtn = false, disabled = false, onClose = () => {} } = props;

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

      // 设置图片名称
      imgFilename.current.innerHTML = item.name;

      // 调用接口对文件进行上传操作
      if (!fd) return;
      const uploadRes = await uploaderProduct(fd);
      const files = uploadRes.data.files;
      onFileChange && onFileChange({ field, files });
    }
  };

  // 关闭上传控件
  const closeHandle = () => {
    onClose && onClose();
  };

  return (
    <div className="UI-ImgUpload">
      <div className="UI-ImgUpload--lable">{label}</div>
      <div className="UI-ImgUpload--preview">
        <img ref={imgPreviewRef} alt="图片预览" src={src} />
        {/* 关闭图标 */}
        {closeBtn && (
          <div onClick={closeHandle} className="UI-ImgUpload--close">
            <span className="UI-ImgUpload--close-btn"></span>
          </div>
        )}
      </div>
      <div ref={imgFilename} className="UI-ImgUpload--img-name">
        文件名称
      </div>
      <Upload disabled={disabled} folder={type} onChange={(fd, filesSrcList) => fileChange(fd, filesSrcList)} text="上传文件" />
    </div>
  );
};

export default ImgUpload;
