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
  next if invalid
    if !((1920 <= (passport["byr"]).to_i) && ((passport["byr"]).to_i <= 2002)) then
      invalid=true
    end
     if !((2010 <= (passport["iyr"]).to_i) && ((passport["iyr"]).to_i <= 2020)) then
      invalid=true
    end
     if !((2020 <= (passport["eyr"]).to_i) && ((passport["eyr"]).to_i <= 2030)) then
      invalid=true
    end

    puts passport
    hgt = ((passport["hgt"])[0...-2]).to_i
    if passport["hgt"].end_with? "cm" then
      if !((150 <= hgt) && (hgt <= 193)) then
      invalid=true
    end
    
    else 
if !((59 <= hgt) && (hgt <= 76)) then
      invalid=true
    end
    end

  if !/^#[0-9a-f]{6}$/.match?( passport["hcl"]) then
          invalid=true

  end

   if  ![ "amb", "blu", "brn", "gry", "grn", "hzl", "oth" ].include? passport["ecl"] then
          invalid=true

  end

  if !/^[0-9]{9}$/.match?( passport["pid"]) then
          invalid=true
  end

  if (!invalid) then valid += 1 end
end


puts valid
