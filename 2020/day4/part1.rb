passports = STDIN.read.split("\n\n").map {|line| Hash[line.gsub("\n", " ").split(" ").map {|r| r.split(":")}]}

valid = 0

reqd = ["byr", "iyr","eyr","hgt","hcl","ecl","pid","cid"]

passports.each do |passport|
  invalid = false
  reqd.each do |key|
    if (!passport.has_key? key) && (key != "cid") then
      invalid = true
      break
    end
  end
  if (!invalid) then valid += 1 end
end


puts valid
