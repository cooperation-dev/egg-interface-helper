package com.egg.ih.db.mapper;

import com.egg.ih.db.model.IhInterface;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author lhx
 * @since 2019-05-17
 */
@Mapper
public interface IhInterfaceMapper extends BaseMapper<IhInterface> {
    /**
     * 根据类主键查询接口列表
     * @param classId
     * @return
     */
    List<IhInterface> findInterfacesByClassId(String classId);
}
