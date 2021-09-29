package com.ssafy.starry.controller.dto;

import com.ssafy.starry.controller.dto.WordResponseDto.Word;
import java.util.ArrayList;
import java.util.List;
import com.ssafy.starry.controller.dto.SearchFlowDto.Data;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SearchDto {

    private List<Word> keywordList;
    private String timeUnit;
    private List<Double> ratios;

    public SearchDto(WordResponseDto wordResponseDto, SearchFlowDto searchFlowDto) {
        keywordList = wordResponseDto.getKeywordList();
        timeUnit = searchFlowDto.getTimeUnit();
        ratios = new ArrayList<Double>();
        for (Data d : searchFlowDto.results.get(0).data) {
            ratios.add(d.ratio);
        }
    }

    public SearchDto(WordResponseDto wordResponseDto, List<Double> ratios) {
        keywordList = wordResponseDto.getKeywordList();
        timeUnit = "month";
        this.ratios = ratios;
    }
}
