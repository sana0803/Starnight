package com.ssafy.starry.controller;

import static com.ssafy.starry.ApiDocumentUtils.getDocumentRequest;
import static com.ssafy.starry.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.SharedHttpSessionConfigurer.sharedHttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.starry.controller.dto.SearchDto;
import com.ssafy.starry.controller.dto.SearchFlowVO;
import com.ssafy.starry.controller.dto.WordVO;
import com.ssafy.starry.controller.dto.WordVO.WordApiResponse;
import com.ssafy.starry.service.WordService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;


@ExtendWith(RestDocumentationExtension.class)
@WebMvcTest(controllers = WordController.class)
class WordApiResponseControllerTest {

    @MockBean
    private WordService wordService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    public void setup(WebApplicationContext webApplicationContext,
        RestDocumentationContextProvider restDocumentation) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
            .apply(documentationConfiguration(restDocumentation))
            .apply(sharedHttpSession())
            .addFilters(new CharacterEncodingFilter("UTF-8", true))
            .build();
    }

    @DisplayName("단어 검색 - 성공")
    @Test
    public void searchWord_success() throws Exception {
        //given
        WordVO wordVO = new WordVO();
        List<WordApiResponse> wordApiResponses = new ArrayList<>();
        wordApiResponses.add(WordApiResponse.builder()
            .relKeyword("소고기")
            .monthlyPcQcCnt("12500")
            .monthlyMobileQcCnt("105000")
            .monthlyAvePcClkCnt("83.1")
            .monthlyAveMobileClkCnt("1171.5")
            .monthlyAvePcCtr("0.69")
            .monthlyAveMobileCtr("1.18")
            .plAvgDepth("15")
            .compIdx("높음")
            .build());
        wordVO.setKeywordList(wordApiResponses);
        SearchFlowVO searchFlowVO = new SearchFlowVO();
        List<Double> ratios = Arrays.asList(86.08608,
            82.08194,
            85.22112,
            82.23059,
            94.73376,
            88.21551,
            86.95837,
            100.0,
            94.45168);

        SearchDto searchDto = new SearchDto(wordVO, ratios);
        given(wordService.getWordAnalysis(any())).willReturn(searchDto);
        //when
        mockMvc.perform(get("/api/word/search")
            .param("word", "소고기")
            .accept(MediaType.APPLICATION_JSON))
            .andDo(print())

            .andExpect(status().isOk())
            .andDo(document("WordApi/getAnalysisWord/success",
                getDocumentRequest(),
                getDocumentResponse(),
                requestParameters(
                    parameterWithName("word").description("검색하려는 단어")
                ),
                responseFields(
                    fieldWithPath("keywordList[].relKeyword").type(JsonFieldType.STRING)
                        .description("연관검색어")
                        .attributes(key("format")
                            .value(
                                "연관 검색어")),
                    fieldWithPath("keywordList[].monthlyPcQcCnt").type(JsonFieldType.STRING)
                        .description(
                            "월간 PC 검색 수")
                        .attributes(key("format")
                            .value(
                                "Sum of PC query counts in recent 30 days. If the query count is less than 10, you get \"<10\".")),
                    fieldWithPath("keywordList[].monthlyMobileQcCnt").type(JsonFieldType.STRING)
                        .description("월간 모바일 검색 수")
                        .attributes(key("format")
                            .value(
                                "Sum of Mobile query counts in recent 30 days. If the query count is less than 10, you get \"<10\".")),
                    fieldWithPath("keywordList[].monthlyAvePcClkCnt").type(JsonFieldType.STRING)
                        .description(
                            "월간 평균 PC 클릭 수(최근 한 달 간 사용자가 해당 키워드를 검색했을 때, 통합검색 영역에 노출된 광고가 받은 평균 클릭수)")
                        .attributes(key("format")
                            .value(
                                "Average PC click counts per keyword's ad in recent 4 weeks. With no data, you get 0.")),
                    fieldWithPath("keywordList[].monthlyAveMobileClkCnt").type(JsonFieldType.STRING)
                        .description(
                            "월간 평균 모바일 클릭 수(최근 한 달 간 사용자가 해당 키워드를 검색했을 때, 통합검색 영역에 노출된 광고가 받은 평균 클릭수)")
                        .attributes(key("format")
                            .value(
                                "recent 4 weeks. With no data, you get 0.")),
                    fieldWithPath("keywordList[].monthlyAvePcCtr").type(JsonFieldType.STRING)
                        .description(
                            "월간 평균 PC 클릭률(클릭수 / 노출수 = 클릭률)")
                        .attributes(key("format")
                            .value(
                                "Click-through rate of PC in recent 4 weeks. With no data, you get 0.")),
                    fieldWithPath("keywordList[].monthlyAveMobileCtr").type(JsonFieldType.STRING)
                        .description(
                            "월간 평균 모바일 클릭률(클릭수 / 노출수 = 클릭률)")
                        .attributes(key("format")
                            .value(
                                "Click-through rate of Mobile in recent 4 weeks. With no data, you get 0.")),
                    fieldWithPath("keywordList[].plAvgDepth").type(JsonFieldType.STRING)
                        .description("최근 한 달 간 사용자가 해당 키워드를 검색했을 때, PC통합검색 영역에 노출된 평균 광고 개수입니다.")
                        .attributes(key("format")
                            .value(
                                "Average depth of PC ad in recent 4 weeks. With no data, you get 0.")),
                    fieldWithPath("keywordList[].compIdx").type(JsonFieldType.STRING)
                        .description(
                            "경쟁정도(최근 한달간 해당 키워드에 대한 경쟁정도를 PC통합검색영역 기준으로 높음/중간/낮음으로 구분한 지표입니다.)")
                        .attributes(key("format")
                            .value(
                                "A competitiveness index based on PC ad. low: low competitiveness, mid: middle competitiveness, high: high competitiveness")),
                    fieldWithPath("keywordList[].compIdx").type(JsonFieldType.STRING)
                        .description(
                            "경쟁정도(최근 한달간 해당 키워드에 대한 경쟁정도를 PC통합검색영역 기준으로 높음/중간/낮음으로 구분한 지표입니다.)")
                        .attributes(key("format")
                            .value(
                                "A competitiveness index based on PC ad. low: low competitiveness, mid: middle competitiveness, high: high competitiveness")),
                    fieldWithPath("timeUnit").type(JsonFieldType.STRING)
                        .description("검색량 추이의 단위입니다")
                        .attributes(key("format")
                            .value(
                                "day, month, year")),
                    fieldWithPath("ratios").type(JsonFieldType.ARRAY)
                        .description("검색량 추이의 월별 리스트입니다.")
                        .attributes(key("format")
                            .value(
                                " 상대값0~100의 수치로 표현됩니다.")),
                    fieldWithPath("rank").type(JsonFieldType.NUMBER)
                        .description("여러 지표를 통해 산출한 키워드 경쟁력 지수입니다")
                        .attributes(key("format")
                            .value(
                                " 0~5까지 0.5 단위로 표시됩니다."))
                )
            ));
        //then
    }

}