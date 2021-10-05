package com.ssafy.starry.controller.dto;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.Queue;

public class twitWordCountDto implements Serializable {
    private static final long serialVersionUID = -7353484588260422449L;
    private long count;
    private Queue<String> preview;

    public twitWordCountDto() {

    }

    public twitWordCountDto(long count) {
        this.count = count;
    }

    public void addPreview(String str){
        if(preview == null){
            preview = new LinkedList<>();
        }
        if(preview.size() >= 5){
            preview.poll();
        }
        preview.offer(str);
    }
    public void addCount(long count){
        this.count += count;
    }
}

