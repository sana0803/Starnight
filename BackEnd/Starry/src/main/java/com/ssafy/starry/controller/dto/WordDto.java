package com.ssafy.starry.controller.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


public class WordDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class WordResponse {

        List<String> relKeyword = new ArrayList<>();
        int monthlyPcQcCnt;
        int monthlyMobileQcCnt;
        int monthlyAvePcClkCnt;
        int monthlyAveMobileClkCnt;
        int monthlyAvePcCtr;
        int monthlyAveMobileCtr;
        int plAvgDepth;
        String compIdx;

        @Builder
        public WordResponse(List<String> relKeyword, int monthlyPcQcCnt, int monthlyMobileQcCnt,
            int monthlyAvePcClkCnt, int monthlyAveMobileClkCnt, int monthlyAvePcCtr,
            int monthlyAveMobileCtr, int plAvgDepth, String compIdx) {
            this.relKeyword = relKeyword;
            this.monthlyPcQcCnt = monthlyPcQcCnt;
            this.monthlyMobileQcCnt = monthlyMobileQcCnt;
            this.monthlyAvePcClkCnt = monthlyAvePcClkCnt;
            this.monthlyAveMobileClkCnt = monthlyAveMobileClkCnt;
            this.monthlyAvePcCtr = monthlyAvePcCtr;
            this.monthlyAveMobileCtr = monthlyAveMobileCtr;
            this.plAvgDepth = plAvgDepth;
            this.compIdx = compIdx;
        }
    }

}
