package com.ssafy.starry.controller.dto;

import com.ssafy.starry.controller.dto.WordDto.WordApiResponse;
import java.util.ArrayList;
import java.util.List;
import com.ssafy.starry.controller.dto.SearchFlowDto.Data;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SearchDto {

    private List<WordApiResponse> keywordList;
    private String timeUnit;
    private List<Double> ratios;
    private double rank;

    public SearchDto(WordDto wordDto, SearchFlowDto searchFlowDto) {
        keywordList = wordDto.getKeywordList();
        timeUnit = searchFlowDto.getTimeUnit();
        ratios = new ArrayList<Double>();
        for (Data d : searchFlowDto.results.get(0).data) {
            ratios.add(d.ratio);
        }

        double sum = ratios.stream().mapToDouble(i -> i).sum();
        double average = sum / ratios.size();
        rank = 0;
        if (average >= 70) {
            rank += 3;
        } else if (average >= 30) {
            rank += 2;
        } else {
            rank += 1;
        }
        String comp = keywordList.get(0).getCompIdx();
        if (comp.equals("높음")) {
            rank += 2;
        } else if (comp.equals("중간")) {
            rank += 1.5;
        } else {
            rank += 1;
        }
        if (average > ratios.get(ratios.size() - 1)) {
            rank -= 0.5;
        }

    }

    public SearchDto(WordDto wordDto, List<Double> ratios) {
        keywordList = wordDto.getKeywordList();
        timeUnit = "month";
        this.ratios = ratios;
        this.rank = 5.0;
    }


}
