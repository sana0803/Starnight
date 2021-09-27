package com.ssafy.starry.controller;

import com.ssafy.starry.controller.dto.WordResponseDto;
import com.ssafy.starry.service.WordService;
import java.util.List;
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

    @GetMapping("/search")
    public ResponseEntity<WordResponseDto> analysisWord(@RequestParam String word) {
        System.out.println("word : " + word);
        WordResponseDto words = wordService.getWordAnalysis(word);
        return ResponseEntity.ok(words);
    }

}
