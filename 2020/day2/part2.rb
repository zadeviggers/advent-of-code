input = STDIN.read.split("\n")

valid_amount = 0
regex = /([0-9]+)-([0-9]+) ([a-z]): (.+)/
input.each do |line|
    a, b, letter, password = line.match(regex).captures
    count = password.count letter 
    # Using the bitwise OR operator (^) seems dodgy, but it should work
    if (password[a.to_i() - 1] == letter) ^ (password[b.to_i() - 1] == letter)
        valid_amount += 1
    end
end

puts valid_amount
