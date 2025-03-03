<?php
/**
 * HashIds
 * @author Prk<code@imprk.me>
 */

namespace App\Library;

use Hashids\Hashids as HashIdsLib; // composer require hashids/hashids

class HashIds {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
    const minHashLength = 8;

    public static function encode($primaryId, $secondaryId, ...$additionalIds): string {
        return @(self::hashIds())->encode(
            self::liteHash($primaryId), $primaryId,
            self::liteHash($secondaryId), $secondaryId,
            ...$additionalIds
        );
    }

    public static function decode($hash, $secondaryId, &$decodedIds = false): int {
        return intval((@(self::hashIds())->decode($hash) ?? [])[1]);
    }

    public static function liteHash(mixed $input): int {
        $hash = crc32(strval($input));
        if (0 > $hash) $hash &= 1 << 7;
        return $hash;
    }

    private static function hashIds(bool $lite = false): HashIdsLib {
        if ($lite) return new HashIdsLib(config('app.key'));
        return new HashIdsLib(
            config('app.key'),
            self::minHashLength,
            self::alphabet
        );
    }
}
