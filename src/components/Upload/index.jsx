import { useState, useCallback, useRef } from 'react';

import './style.scss';

const Upload = props => {
  const { text, onChange } = props;

  // 上传的文件数据
  // const [formData, setFormData] = useState(null);
  const fileRef = useRef(null);

  // 二进制文件相关信息
  // const [filesSrcList, setFilesSrcList] = useState([]);

  // 上传控件改变事件
  const onFileChangeHandel = useCallback(() => {
    const fd = new FormData(); // 创建FormData对象
    const filesSrcList = []; // 存储文件的相关信息
    // fd.append('name', '图片类型');
    // fd.append('title', '文件上传');

    const fileDom = fileRef.current;
    const files = fileDom.files;
    console.log('读取到的要上传的文件', files);

    for (let i = 0; i < files.length; i++) {
      const fileItem = files[i];
      fd.append(`files${i}`, fileItem); // 往FormData对象中添加数据

      const fileItemInfo = {
        src: window.URL.createObjectURL(fileItem),
        name: fileItem.name,
        size: fileItem.size,
      };

      filesSrcList.push(fileItemInfo);
    }
    // setFormData(fd);
    // setFilesSrcList(filesSrcList);

    console.log('读取到的要上传fd', fd);

    onChange && onChange(fd, filesSrcList);
  }, [onChange]);

  return (
    <div className="UI-Upload">
      <input ref={fileRef} onChange={onFileChangeHandel} type="file" multiple="multiple" />
      <button type="button" className="UI-Upload__file">
        {text}
      </button>
    </div>
  );
};

export default Upload;
