import { describe, expect, it } from 'vitest';
import { convertMarkup, normalizeRules, validateRules } from '../src/model';

describe('review fixes', () => {
	it('bold and italic markup with spaces inside the tags still renders as emphasis', () => {
		expect(convertMarkup('A[f] bold [/f]b and [k]it [/k]c', new Map()).text).toBe('A **bold** b and *it* c');
		expect(convertMarkup('x[f] [/f]y', new Map()).text).toBe('x y');
	});
	it('rejects a keyword property that differs from a reserved property only in case', () => {
		for (const name of ['Tags', 'TITLE', 'Zkn3_position']) {
			expect(() => validateRules({ fileName: 'number', keywordProperty: name, keywordTags: true })).toThrow();
			expect(normalizeRules({ fileName: 'number', keywordProperty: name }).keywordProperty).toBe('keywords');
		}
	});
});
