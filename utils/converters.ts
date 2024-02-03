export function getFileTypeFromBase64(base64String: string): string {
	// Remove metadata from the base64 string if it exists
	const base64Data = base64String.replace(/^data:[^;]+;base64,/, "");

	// Convert base64 string to a binary string
	const binaryString = atob(btoa(base64Data));

	// Get the first few bytes of the binary string
	const firstBytes = binaryString.substring(0, 4);

	// Define um mapa de magic numbers para tipos de arquivo
	const magicNumbers: { [key: string]: string } = {
		"\x89\x50\x4e\x47": ".png", // PNG
		"\xff\xd8\xff\xe0": ".jpg", // JPEG
		"\xff\xd8\xff\xe1": ".jpg", // JPEG
		BM: ".bmp", // BMP
		GIF8: ".gif", // GIF
		"\x49\x49\x2a\x00": ".tiff", // TIFF (little-endian)
		"\x4d\x4d\x00\x2a": ".tiff", // TIFF (big-endian)
		RIFF: ".webp", // WEBP
		"PK\x03\x04": ".zip", // ZIP
		"Rar!\x1a\x07\x00": ".rar", // RAR
		"%PDF": ".pdf", // PDF
		"7z\xbc\xaf\x27\x1c": ".7z", // 7z
		OggS: ".ogg", // OGG
		fLaC: ".flac", // FLAC
		MP3: ".mp3", // MP3
		MP4: ".mp4", // MP4
		"....ftyp": ".mp4", // MP4
		"FLV\x01": ".flv", // FLV
		MOOV: ".mov", // MOV
		ftypM4V: ".m4v", // M4V
		MThd: ".mid", // MIDI
		MTrk: ".mid", // MIDI
		wOFF: ".woff", // WOFF
		wOF2: ".woff2", // WOFF2
	};

	// Verifica se os primeiros bytes correspondem a algum tipo de arquivo conhecido
	for (const magicNumber in magicNumbers) {
		if (firstBytes.startsWith(magicNumber)) {
			return magicNumbers[magicNumber];
		}
	}

	// Se nenhum tipo de arquivo conhecido for encontrado, retorna uma string vazia
	return "";
}

export function base64ToBlob(base64String: string, type: string) {
	// Remove metadata from the base64 string if it exists
	const base64Data = base64String.replace(/^data:[^;]+;base64,/, "");

	// Convert base64 string to a binary string
	const binaryString = atob(btoa(base64Data));

	// Get the length of the binary string
	const length = binaryString.length;

	// Create a Uint8Array from the binary string
	const uint8Array = new Uint8Array(length);
	for (let i = 0; i < length; i++) {
		uint8Array[i] = binaryString.charCodeAt(i);
	}

	// Create a Blob from the Uint8Array
	return new Blob([uint8Array], { type });
}

export function decodeJWT(jwt: string) {
	// Divida o JWT em partes (cabeçalho, payload e assinatura)
	const [headerEncoded, payloadEncoded, signature] = jwt.split(".");

	// Decodifique o cabeçalho (a primeira parte do JWT)
	const header = JSON.parse(atob(headerEncoded));

	// Decodifique o payload (a segunda parte do JWT)
	const payload = JSON.parse(atob(payloadEncoded));

	return { header, payload, signature };
}
