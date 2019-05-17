package com.egg.ih.biz.api.control;

import com.egg.ih.biz.api.service.ApiService;
import com.egg.ih.biz.api.vo.*;
import com.egg.ih.db.model.IhParams;
import com.egg.ih.util.errorcode.DefaultErrorCode;
import com.egg.ih.util.response.BaseResponse;
import com.egg.ih.util.response.ResponseBuilder;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Administrator
 */
@RestController
@RequestMapping(value = "/rest/apiService/v1")
@Api(value = "/rest/apiService/v1", tags = {"接口管理类"})
public class ApiController {
    @Autowired
    private ApiService apiService;
    private static final Gson gson = new Gson();

    /**
     * 创建接口函数时入参接口对象
     */
    private static final String INTERFACE_VO = "interfaceVO";
    private static final String PARAMS_VO = "paramsVO";
    private static final String HEADERS_VO = "headersVO";
    private static final String BODY_VO = "bodyVO";
    private static final String RESPONSE_VO = "responseVO";


    @ApiOperation(notes = "/class", value = "创建接口类")
    @ApiImplicitParam(name = "ihClassVO", value = "接口类", dataType = "com.egg.ih.biz.api.vo.IhClassVO", paramType = "body", required = true)
    @PostMapping(value = "/class")
    public BaseResponse<Integer> createClass(@RequestBody IhClassVO ihClassVO) {

        return ResponseBuilder.build(DefaultErrorCode.SUCCESS, apiService.saveClass(ihClassVO));
    }

    @ApiOperation(notes = "/interface", value = "创建接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "map", value = "封装map对象, 包含params、headers、body、response", dataType = "Map", paramType = "body")
    })
    @PostMapping(value = "/interface")
    public BaseResponse<Integer> createInterface(@RequestBody Map<String, Object> map) {

        IhInterfaceVO interfaceVO = null;
        List<IhParamsVO> ihParamsVOS = null;
        List<IhHeaderVO> ihHeaderVOS = null;
        IhBodyVO ihBodyVO = null;
        IhResponseVO responseVO = null;

        if(map.get(INTERFACE_VO) != null) {
            interfaceVO = gson.fromJson(gson.toJson(map.get(INTERFACE_VO)), IhInterfaceVO.class);
        }
        if(map.get(PARAMS_VO) != null) {
            Type type = new TypeToken<List<IhParamsVO>>(){}.getType();
            ihParamsVOS = gson.fromJson(gson.toJson(map.get(PARAMS_VO)), type);

        }
        if(map.get(HEADERS_VO) != null) {
            Type type = new TypeToken<List<IhHeaderVO>>(){}.getType();
            ihHeaderVOS = gson.fromJson(gson.toJson(map.get(HEADERS_VO)), type);

        }
        if(map.get(BODY_VO) != null) {
            ihBodyVO = gson.fromJson(gson.toJson(map.get(BODY_VO)), IhBodyVO.class);
        }

        if(map.get(RESPONSE_VO) != null) {
            responseVO = gson.fromJson(gson.toJson(map.get(RESPONSE_VO)), IhResponseVO.class);
        }


        return ResponseBuilder.build(DefaultErrorCode.SUCCESS, apiService.saveInterface(interfaceVO, ihParamsVOS, ihHeaderVOS, ihBodyVO, responseVO));
    }

    @ApiOperation(notes = "/classes", value = "查询接口类列表")
    @GetMapping(value = "/classes")
    public BaseResponse<List<IhClassVO>> findClasses() {
        List<IhClassVO> list = new ArrayList<>();

        return ResponseBuilder.build(DefaultErrorCode.SUCCESS, list);
    }

    @ApiOperation(notes = "/interface/{interfaceName}", value = "根据接口名查询接口类列表, 以接口类包裹形式展示")
    @ApiImplicitParam(name = "interfaceName", value = "根据类名查询接口类", dataType = "String", paramType = "path", required = true)
    @GetMapping(value = "/interface/{interfaceName}")
    public BaseResponse<List<IhClassVO>> findClassesByName(@PathVariable String interfaceName) {
        List<IhClassVO> list = new ArrayList<>();

        return ResponseBuilder.build(DefaultErrorCode.SUCCESS, list);
    }

    @ApiOperation(notes = "/interfaces", value = "根据类主键查询接口列表")
    @ApiImplicitParam(name = "classId", value = "接口类主键", dataType = "String", paramType = "query", required = true)
    @GetMapping(value = "/interfaces")
    public BaseResponse<List<IhInterfaceVO>> findInterfaceByClassId(@RequestParam String classId) {
        return ResponseBuilder.build(DefaultErrorCode.SUCCESS, new ArrayList<>());
    }

    @ApiOperation(notes = "/interface/{interfaceId}", value = "根据接口主键查询接口内容")
    @ApiImplicitParam(name = "interfaceId", value = "接口主键", dataType = "String", paramType = "path", required = true)
    @GetMapping(value = "/interface/{interfaceId}")
    public BaseResponse<IhClassVO> findClassById(@PathVariable String interfaceId) {
        return ResponseBuilder.build(DefaultErrorCode.SUCCESS, new IhClassVO());
    }

    @ApiOperation(notes = "/class/{classId}", value = "根据类主键删除接口类")
    @ApiImplicitParam(name = "classId", value = "接口主键", dataType = "String", paramType = "path", required = true)
    @DeleteMapping(value= "/class/{classId}")
    public BaseResponse deleteClassById(@PathVariable String classId) {
        return ResponseBuilder.build(DefaultErrorCode.SUCCESS);
    }

    @ApiOperation(notes = "/interface/{interfaceId}", value = "根据类主键删除接口")
    @ApiImplicitParam(name = "interface", value = "接口主键", dataType = "String", paramType = "path", required = true)
    @DeleteMapping(value= "/interface/{interfaceId}")
    public BaseResponse deleteInterfaceById(@PathVariable String interfaceId) {
        return ResponseBuilder.build(DefaultErrorCode.SUCCESS);
    }

    @ApiOperation(notes = "/class/{classId}", value = "修改接口类")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "classId", value = "接口类主键", dataType = "String", paramType = "path", required = true),
        @ApiImplicitParam(name = "className", value = "接口类名称", dataType = "String", paramType = "query", required = true)
    })
    @PutMapping(value = "/class/{classId}")
    public BaseResponse updateClass(@PathVariable String classId, @RequestParam String className) {
        return ResponseBuilder.build(DefaultErrorCode.SUCCESS);
    }

    @ApiOperation(notes = "/interface/{interfaceId}", value = "修改接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "interfaceId", value = "接口主键", dataType = "String", paramType = "path", required = true),
            @ApiImplicitParam(name = "interfaceVO", value = "接口类", dataType = "IhInterfaceVO", paramType = "query", required = true),
            @ApiImplicitParam(name = "paramsVO", value = "params参数", dataType = "IhParamsVO", paramType = "query"),
            @ApiImplicitParam(name = "headerVO", value = "headers参数", dataType = "IhHeaderVO", paramType = "query"),
            @ApiImplicitParam(name = "bodyVO", value = "body参数", dataType = "IhBodyVO", paramType = "query"),
            @ApiImplicitParam(name = "responseVO", value = "返回值类", dataType = "IhResponseVO", paramType = "query")
    })
    @PutMapping(value = "/interface/{interfaceId}")
    public BaseResponse updateInterfaceById(@PathVariable String interfaceId,
                                        @RequestBody IhInterfaceVO interfaceVO,
                                        @RequestBody(required = false) IhParamsVO paramsVO,
                                        @RequestBody(required = false) IhHeaderVO headerVO,
                                        @RequestBody(required = false) IhBodyVO bodyVO,
                                        @RequestBody(required = false) IhResponseVO responseVO) {
        return ResponseBuilder.build(DefaultErrorCode.SUCCESS);
    }

    @ApiOperation(notes = "/interfaces/history", value = "查询记录访问的操作的历史记录")
    @GetMapping(value = "/interfaces/history")
    public BaseResponse<List<IhHiOperVO>> findHistory() {
        return ResponseBuilder.build(DefaultErrorCode.SUCCESS, new ArrayList<>());
    }


}
