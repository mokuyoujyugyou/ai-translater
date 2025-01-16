// リクエストパラメータの型
interface UploadFile {
    data: Uint8Array | ArrayBuffer;
}

// エラーの型
interface ApiError {
    statusCode: number;
    statusMessage: string;
    message: string;
}

// エラーの型を拡張
interface CustomError extends Error {
    statusCode?: number;
    statusMessage?: string;
}

interface EmotionsHAS {
    happy: number;  // 喜び (0-100)
    angry: number;  // 怒り (0-100)
    sad: number;    // 悲しみ (0-100)
}

interface Word {
    text: string;           // 単語のテキスト
    emotions: EmotionsHAS;  // 単語に関連する感情値の集合
}

interface Sentence {
    words: Word[];  // 文を構成する単語のリスト
}

interface Sentences {
    sentences: Sentence[];  // 文章を構成する文のリスト
}

interface TranslatedSentence {
    origin: Sentence;     // 原文
    translated: Sentence; // 翻訳文
}

interface TranslatedSentences {
    translated: TranslatedSentence[];  // 翻訳された文のリスト
}

interface Entry {
    translated_sentence: TranslatedSentence;  // 翻訳されたセンテンス
    file: Uint8Array | ArrayBuffer; // ファイルバイト列
}

interface Entries {
    entries: Entry[];  // エントリーのリスト
}

// レスポンスの型
interface VoiceGenResponse {
    status: 'success';
    data: {
        entries: Entries;
    };
}
