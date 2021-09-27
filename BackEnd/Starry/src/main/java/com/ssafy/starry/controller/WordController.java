package com.ssafy.starry.controller;

import com.ssafy.starry.controller.dto.WordDto.WordResponse;
import com.ssafy.starry.service.WordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/word")
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping("")
    public ResponseEntity<WordResponse> analysisWord(@RequestParam String word) {
        WordResponse wordResponse = wordService.getWordAnalysis();
        return ResponseEntity.ok(wordResponse);
    }

}
