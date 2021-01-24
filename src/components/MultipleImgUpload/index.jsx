// 多文件上传
import React, { useCallback, useMemo } from 'react';
import ImgUpload from '../ImgUpload';
import './style.scss';

const getImgUpCompList = fileList => {
  const imgUpCompList = JSON.parse(fileList);
  imgUpCompList.push({
    src: null,
  });

  console.log('imgUpCompList改变了', imgUpCompList);

  return imgUpCompList;
};

const MultipleImgUpload = props => {
  const { type, field, label, text, onFileChange, fileList, onFileClose, disabled = false } = props;

  const imgUpCompList = useMemo(() => getImgUpCompList(fileList), [fileList]);

  // 文件上传发生改变
  const fileChangeHandel = useCallback(
    (fileData, index) => {
      console.log('multiple-fileData', fileData);

      onFileChange && onFileChange(fileData, index);
    },

    [onFileChange]
  );

  // 点击关闭按钮的时候触发8
  const onCloseHandle = useCallback(
    index => {
      console.log('删除的控件索引', index);

      onFileClose && onFileClose(index, field);
    },
    [onFileClose, field]
  );

  return (
    <div className="UI-MultipleImgUpload">
      {imgUpCompList.map((item, index) => (
        <ImgUpload
          key={index}
          closeBtn={disabled || index === imgUpCompList.length - 1 ? false : true}
          field={field}
          src={item.src}
          type={type}
          label={label}
          onFileChange={fileData => fileChangeHandel(fileData, index)}
          text={text}
          onClose={() => onCloseHandle(index)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default MultipleImgUpload;
