package com.ssafy.starry.controller.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class TrendDto {

    List<String> keywords;

    @Builder
    public TrendDto(List<String> keywords) {
        this.keywords = keywords;
    }
}
