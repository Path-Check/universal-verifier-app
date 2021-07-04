#!/bin/bash

# This script is used to regenerate the vaccine code map
# used in app/components/SHCCard.js.

# Use:
#  1.  Download the txt version of the
#      "IIS: HL7 Standard Code Set
#      Mapping product names to CVX and MVX"
#      from here:
#      https://www2a.cdc.gov/vaccines/iis/iisstandards/downloads/TRADENAME.txt
#  2.  Save the downloaded file over TRADENAME.txt in the directory with this script.
#  3.  Run this script and paste the output in the appropriate place within
#      SHCCard.js.

awk -F'|' '{print "\t" $3 "\t: \"" $1 "\","}' TRADENAME.txt | sort -n
