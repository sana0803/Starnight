package com.ssafy.starry.controller;

import com.ssafy.starry.controller.dto.SearchDto;
import com.ssafy.starry.service.WordService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/word")
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping("/search")
    public ResponseEntity<SearchDto> analysisWord(@RequestParam String word) {
        log.info("검색한 단어 : " + word);
        SearchDto words = wordService.getWordAnalysis(word);
        return ResponseEntity.ok(words);
    }

}
