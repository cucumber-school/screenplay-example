namespace :docs do
  task :code do
    current_branch = `git rev-parse --abbrev-ref HEAD`
    `rm -rf code`
    `mkdir code`
    commits = `git rev-list start...end`.split.reverse
    commits.each_with_index do |commit, i|
      message = `git show -s --format=%s #{commit}`.
        downcase.
        gsub(/ /, '-').
        gsub(/[.,\':]/, '')
      dir = "code/%02d-#{message}" % i
      `mkdir #{dir}`
      `git checkout #{commit}`
      `cp -R {lib,features,package.json} #{dir}`
    end
    `git checkout #{current_branch}`
  end

  task :html do
    require 'asciidoctor'
    Asciidoctor.convert_file 'index.adoc',
      safe: :unsafe,
      to_dir: '.',
      mkdirs: true
  end
end

task :default => ['docs:code', 'docs:html']
