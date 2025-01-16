import { readFile } from 'fs/promises';

export default defineEventHandler(async (event) => {
    try {
        const params = await readBody<UploadFile>(event)

        if (params.data.byteLength > 1024 * 1024 * 10) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                message: 'too large file'
            })
        }

        // 音声生成処理
        const result = await generateVoice(params)

        const response: VoiceGenResponse = {
            status: 'success',
            data: {
                entries: result
            }
        }

        return response

    } catch (error: unknown) {
        const customError = error as CustomError

        const apiError: ApiError = {
            // 必ず数値が入るようにする
            statusCode: ('statusCode' in customError && customError.statusCode)
                ? customError.statusCode
                : 500,
            // 必ず文字列が入るようにする
            statusMessage: ('statusMessage' in customError && customError.statusMessage)
                ? customError.statusMessage
                : 'Internal Server Error',
            // Error.messageは必ずstring型
            message: customError instanceof Error && customError.message
                ? customError.message
                : 'Unexpected error occurred'
        }

        throw createError(apiError)
    }
})

// 音声生成関数の型定義
interface VoiceGenerationResult {
    url: string;
    duration: number;
    format: string;
}

async function generateVoice(params: UploadFile): Promise<Entries> {
    // 実際の音声生成処理
    return sampleData
}

/**
 * 指定されたパスのファイルを読み込み、バイト列として返す
 * @param filePath - 読み込むファイルのパス
 * @returns Promise<Buffer> - ファイルの内容をバイト列として返す
 * @throws Error - ファイルの読み込みに失敗した場合
 */
async function readFileAsBytes(filePath: string): Promise<Buffer> {
    try {
        // ファイルをバイナリとして読み込む
        const buffer: Buffer = await readFile(filePath);
        return buffer;
    } catch (error) {
        // エラーの種類に応じて適切なエラーメッセージを設定
        if (error instanceof Error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                throw new Error(`File not found: ${filePath}`);
            } else if ((error as NodeJS.ErrnoException).code === 'EACCES') {
                throw new Error(`Permission denied: ${filePath}`);
            }
        }
        // その他のエラー
        throw new Error(`Failed to read file: ${filePath}, Error: ${error}`);
    }
}

const sampleData: Entries = {
    entries: [
        {
            translated_sentence: {
                origin: {
                    words: [
                        {
                            text: "今日",
                            emotions: {
                                happy: 80,
                                angry: 0,
                                sad: 5
                            }
                        },
                        {
                            text: "は",
                            emotions: {
                                happy: 50,
                                angry: 0,
                                sad: 0
                            }
                        },
                        {
                            text: "とても",
                            emotions: {
                                happy: 90,
                                angry: 0,
                                sad: 0
                            }
                        },
                        {
                            text: "楽しい",
                            emotions: {
                                happy: 95,
                                angry: 0,
                                sad: 0
                            }
                        }
                    ]
                },
                translated: {
                    words: [
                        {
                            text: "Today",
                            emotions: {
                                happy: 80,
                                angry: 0,
                                sad: 5
                            }
                        },
                        {
                            text: "is",
                            emotions: {
                                happy: 50,
                                angry: 0,
                                sad: 0
                            }
                        },
                        {
                            text: "very",
                            emotions: {
                                happy: 90,
                                angry: 0,
                                sad: 0
                            }
                        },
                        {
                            text: "fun",
                            emotions: {
                                happy: 95,
                                angry: 0,
                                sad: 0
                            }
                        }
                    ]
                }
            },
            file: await readFileAsBytes('./test/test.wav')
        }
    ]
};