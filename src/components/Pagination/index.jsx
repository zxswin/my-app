import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';

import classnames from 'classnames';
import './style.scss';

/**
 * 创建指定长度的数组 数组的元素为递增序列
 * @param {number} currentPage 当前激活页码
 * @param {number} size 要创建的数组长度
 * @param {number} showMaxSize 除去开头和结尾最多展示多少个页码
 * @param {number} totalSize 页码总数
 * @returns {array} 返回一个数组
 */

const createIncreaseArr = (currentPage, size, showMaxSize, totalSize) => {
  let resultArr = [];

  // 如果页面总数小于showMaxSize
  if (totalSize <= showMaxSize) {
    for (let i = 1; i <= totalSize; i++) {
      resultArr.push(i);
    }
    return resultArr;
  }

  // 需要生成的数组长度小于5
  if (size < showMaxSize) {
    for (let i = 0; i < size; i++) {
      resultArr.push(currentPage + i);
    }

    return resultArr;
  }

  if (currentPage < showMaxSize) {
    // 如果当前激活页码小于5
    for (let i = 2; i <= size; i++) {
      resultArr.push(i);
    }
    return resultArr;
  }

  if (currentPage - 1 > totalSize - showMaxSize) {
    // 如果当前激活页码 > 总页码 - 最多展示的页码数量
    for (let i = 1; i < showMaxSize; i++) {
      resultArr.push(totalSize - i);
    }
    resultArr = resultArr.reverse();
  } else {
    // 当前激活页面居中 左右两边的元素数量
    const bothSideNum = Math.floor(size / 2);
    const leftSideArr = createIncreaseArr(currentPage - bothSideNum, bothSideNum, showMaxSize);
    const rightSizeArr = createIncreaseArr(currentPage + 1, bothSideNum, showMaxSize);

    resultArr = [...leftSideArr, currentPage, ...rightSizeArr];
  }

  return resultArr;
};

const Pagination = props => {
  const {
    total = 501, // 当前的数据总数
    currentPage = 1, // 当前激活的页码
    currPageSize = 10, // 当前每页展示多少条数据
    pageSizeOptions = [10, 20, 50, 100], // 可以选择的pageSize
    onChangePageSize = () => {}, // 改变pageSize触发的事件
    onChangeCurrentPage = () => {}, // 改变当前激活的页面
    showMaxSize = 5, // 除去开头和结尾最多展示多少个页码
  } = props;

  const paginationRef = useRef(null);

  // 是否展示pageSize选择框
  const [showPageSize, setShowPageSize] = useState(false);
  // 需要分多少页
  const totalSize = Math.ceil(total / currPageSize);
  const [size, setSize] = useState(totalSize);

  // 需要展示的页码数组
  const maxSizeShowArr = useMemo(() => createIncreaseArr(currentPage, showMaxSize, showMaxSize, size), [currentPage, showMaxSize, size]);
  // 点击改变当前页面
  const changeCurrentPage = useCallback(
    num => {
      onChangeCurrentPage && onChangeCurrentPage(num);
    },
    [onChangeCurrentPage]
  );

  // 输入框跳转页
  const [jumpPage, setJumpPage] = useState('');
  // 改变跳转页
  const onChangeJumpPage = useCallback(e => {
    const jumpPage = e.currentTarget.value;
    console.log(jumpPage);
    setJumpPage(jumpPage);
  }, []);
  // 跳转页输入框失去焦点的时候进行跳转
  const jumpPageHandle = useCallback(() => {
    const jumpPageNum = Number(jumpPage);
    if (!jumpPageNum || jumpPageNum > size || jumpPageNum < 1) {
      setJumpPage('');
      return;
    }
    onChangeCurrentPage && onChangeCurrentPage(jumpPageNum);
    setJumpPage('');
  }, [jumpPage, onChangeCurrentPage, size]);

  // 组件初始化的时候执行
  useEffect(() => {
    const totalSize = Math.ceil(total / currPageSize);
    console.log('totalSize', totalSize);

    setSize(totalSize);
  }, [currPageSize, total]);

  // 点击显示pageSize选择框
  const clickShowPageSize = useCallback(() => {
    setShowPageSize(true);
    setTimeout(() => {
      const paginationDom = paginationRef.current;
      const pageSizeOptionsDom = paginationDom.querySelector('.UI-Pagination__page-size--options');
      const { height } = window.getComputedStyle(pageSizeOptionsDom);
      pageSizeOptionsDom.style.cssText = `top:${-parseInt(height) - 10 + 'px'};opacity: 1;`;
    });
  }, []);
  // 点击切换每页显示多少条
  const changePageSizeHandle = useCallback(
    pageSize => {
      setShowPageSize(false);
      onChangePageSize && onChangePageSize(pageSize);
    },
    [onChangePageSize]
  );

  // 隐藏pageSize显示框
  const clickHidePageSize = useCallback(() => {
    setTimeout(() => {
      setShowPageSize(false);
    }, 300);
  }, []);

  // 点击了上一页
  const onClickPrevous = useCallback(() => {
    if (currentPage === 1) return;
    const num = currentPage - 1;
    onChangeCurrentPage && onChangeCurrentPage(num);
  }, [currentPage, onChangeCurrentPage]);

  // 点击了下一页
  const onClickNext = useCallback(() => {
    if (currentPage === size) return;
    const num = currentPage + 1;
    onChangeCurrentPage && onChangeCurrentPage(num);
  }, [currentPage, onChangeCurrentPage, size]);

  return (
    <div className="UI-Pagination" ref={paginationRef}>
      <div onClick={onClickPrevous} className={classnames('UI-Pagination__previous', { disabled: currentPage === 1 })}>
        <span className="UI-Pagination__previous--icon-pre"></span>
      </div>
      <ul className="UI-Pagination__pages">
        {totalSize > showMaxSize && (
          <li
            className={classnames({
              active: 1 === currentPage,
            })}
            onClick={() => changeCurrentPage(1)}
          >
            1
          </li>
        )}

        {currentPage >= showMaxSize && <li>...</li>}

        {maxSizeShowArr.map((num, index) => (
          <li
            key={`${num}${index}`}
            className={classnames({
              active: num === currentPage,
            })}
            onClick={() => changeCurrentPage(num)}
          >
            {num}
          </li>
        ))}

        {currentPage <= size - showMaxSize + 1 && <li>...</li>}

        {totalSize > showMaxSize && (
          <li
            className={classnames({
              active: size === currentPage,
            })}
            onClick={() => changeCurrentPage(size)}
          >
            {size}
          </li>
        )}
      </ul>
      <div onClick={onClickNext} className={classnames('UI-Pagination__next', { disabled: currentPage === size })}>
        <span className="UI-Pagination__previous--icon-next"></span>
      </div>
      <div className="UI-Pagination__page-size">
        <div onClick={clickShowPageSize} onBlur={clickHidePageSize} className="UI-Pagination__page-size--current" tabIndex="0">
          {currPageSize}条/页
        </div>
        {showPageSize && (
          <ul className="UI-Pagination__page-size--options">
            {pageSizeOptions.map((pageSize, index) => (
              <li
                key={`${index}${pageSize}`}
                onClick={() => changePageSizeHandle(pageSize)}
                className={classnames({ active: pageSize === currPageSize })}
              >{`${pageSize}条/页`}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="UI-Pagination__jump-pages">
        <span>跳至</span>
        <input value={jumpPage} onChange={onChangeJumpPage} onBlur={jumpPageHandle} type="text" />
        <span>页</span>
      </div>
    </div>
  );
};

export default Pagination;
