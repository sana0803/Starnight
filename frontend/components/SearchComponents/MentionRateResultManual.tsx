import styles from '../../styles/ResultManual.module.scss';

const MentionRateResultManual = () => {
    
    return (
        <div className={styles.manualBox}>
            SNS에 단어가 언급된 언급량입니다.
            <br/>
            2021.10.05일 이후의 언급량입니다.
        </div>
    );

}

export default MentionRateResultManual;