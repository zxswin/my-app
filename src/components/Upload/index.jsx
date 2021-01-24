import { useCallback, useRef } from 'react';
import classnames from 'classnames';
import './style.scss';

const Upload = props => {
  const { folder = 'img', text = '文件上传', disabled = false, onChange } = props;

  // 上传的文件数据
  const fileRef = useRef(null);

  // 上传控件改变事件
  const onFileChangeHandel = useCallback(() => {
    const fd = new FormData(); // 创建FormData对象
    const filesSrcList = []; // 存储文件的相关信息
    const fileDom = fileRef.current;
    const files = fileDom.files;

    fd.append('folder', folder);

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

    onChange && onChange(fd, filesSrcList);
  }, [onChange, folder]);

  return (
    <div className="UI-Upload">
      <label
        htmlFor="UI-Upload--file-input"
        className={classnames('UI-Upload--upload-btn', { 'UI-Upload--upload-btn-disabled': disabled })}
      >
        {text}
      </label>
      <input
        id="UI-Upload--file-input"
        className="UI-Upload--file-input"
        ref={fileRef}
        onChange={onFileChangeHandel}
        type="file"
        multiple="multiple"
        disabled={disabled}
      />
    </div>
  );
};

export default Upload;
