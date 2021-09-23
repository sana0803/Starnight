package com.ssafy.starry.config;

import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;


@Component
public class CsvParseBean {

    public static Set<String> foods = new HashSet<>();

    public Set<String> readCSV() {
        try {
            System.out.println("readCSV readCSV");
            //new CSVReader(InputStreamReader 객체, 구분자, 예외구문, 삭제할 열)
            //구분자 : csv 구분자가 ',' 이므로 ,로 지정. 챕들 다른 표식일 경우 다른 것으로 지정도 가능
            //예외구문 : "는 예외 구분
            //삭제할 열 : 윗줄은 보통 설명문구일 경우가 많으므로 삭제하고 출력하고 싶은 경우 줄삭제가 가능하다
            ClassPathResource resource = new ClassPathResource("static/csv/food_name_csv.csv");

            CSVReader reader = new CSVReader(
                new InputStreamReader(new FileInputStream(resource.getFile()),
                    StandardCharsets.UTF_8));
            String[] nextLine;
            nextLine = reader.readNext(); // 목차 버리기
            while ((nextLine = reader.readNext()) != null) {   // 2
                foods.add(nextLine[1]);
            }
            reader.close();
        } catch (Exception e) {
            e.getStackTrace();
        }

        return foods;
    }

    @PostConstruct
    private void initialize() {
        foods = readCSV();
    }

}
