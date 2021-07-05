#!/usr/bin/python

"""Script to generate CDC Vaccine Code : Common Name map.

This script is used to regenerate the vaccine code map
used in app/components/SHCCard.js.

Use:
 1.  Download the txt version of the
     "IIS: HL7 Standard Code Set
     Mapping product names to CVX and MVX"
     from here:
     https://www2a.cdc.gov/vaccines/iis/iisstandards/downloads/TRADENAME.txt
 2.  Save the downloaded file over TRADENAME.txt in the directory with this script.
 3.  Run this script and paste the output in the appropriate place within
     SHCCard.js.

"""

import collections
import csv

TRADENAME_FILE = "TRADENAME.txt"

def main():
    """Process the file and print out a useful map."""
    # Source list contains duplicates with differences only in whitespace.
    cleaned_entries = collections.defaultdict(set)
    with open(TRADENAME_FILE) as csvfile:
        vaccine_entries = csv.reader(csvfile, delimiter='|')
        for row in vaccine_entries:
            code = int(row[2].strip())
            # TODO: Consider performing uniqueness checks based only on
            #       case-insensitive word characters.
            #       See code 140 for case in point.
            cleaned_entries[code].add(row[0].strip())

    for code, names in sorted(cleaned_entries.items()):
        print('\t{}\t: "{}",'.format(code, '; '.join(sorted(names))))


if __name__ == "__main__":
    main()
